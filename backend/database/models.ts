import path from "path";
import { DataTypes, Model, QueryTypes, Sequelize } from "sequelize";
import type { ChatMessage } from "../../shared/types/chat-message";
import type { User } from "../auth/generate-tokens";

const sequelize = new Sequelize({
  dialect: process.env.NODE_ENV === "production" ? "postgres" : "sqlite",
  storage:
    process.env.NODE_ENV === "production"
      ? undefined
      : path.join(__dirname, "../..", "mydb.sqlite"),
  logging: false,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...(process.env.NODE_ENV === "production" && process.env.DB_USE_SSL === "true"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {}),
});

class UserModel extends Model<User> {}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
  },
);

// Define ChatMessage model
class ChatMessageModel extends Model<ChatMessage> {}

ChatMessageModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Math.floor(Date.now() / 1000),
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ChatMessage",
    tableName: "ChatMessages",
  },
);

// Define relationships
UserModel.hasMany(ChatMessageModel, { foreignKey: "userID" });
ChatMessageModel.belongsTo(UserModel, {
  foreignKey: "userID",
  targetKey: "id",
});

export class Database {
  async initialize() {
    try {
      await this.createTablesIfNotExist();
      await this.updateExistingSchema();
      console.log("Database initialization completed successfully.");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  private async createTablesIfNotExist() {
    await sequelize.sync({ force: false });
  }

  private async updateExistingSchema() {
    const queryInterface = sequelize.getQueryInterface();

    // Update User table
    if (await this.tableExists("Users")) {
      const userAttributes = await queryInterface.describeTable("Users");
      if (!userAttributes.id) {
        await queryInterface.addColumn("Users", "id", {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        });
      }
    }

    // Update ChatMessage table
    if (await this.tableExists("ChatMessages")) {
      const chatMessageAttributes =
        await queryInterface.describeTable("ChatMessages");
      if (!chatMessageAttributes.userID) {
        await queryInterface.addColumn("ChatMessages", "userID", {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        });
      }
    }
  }

  private async tableExists(tableName: string): Promise<boolean> {
    try {
      await sequelize.query(`SELECT 1 FROM ${tableName} LIMIT 1;`, {
        type: QueryTypes.SELECT,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async findUser(username: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { username } });
  }

  async createUser(user: User): Promise<UserModel> {
    return await UserModel.create(user);
  }

  async addToChatHistory(chatMessage: ChatMessage): Promise<ChatMessageModel> {
    return await ChatMessageModel.create(chatMessage);
  }

  async getFullChatHistory(): Promise<ChatMessageModel[]> {
    return await ChatMessageModel.findAll({
      include: [{ model: UserModel, attributes: ["username"] }],
      order: [["timestamp", "ASC"]],
    });
  }
}
