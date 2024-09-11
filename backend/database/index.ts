import { DataTypes, Model } from "sequelize";
import type { ChatMessage } from "../../shared/types/chat-message";
import type { User } from "../auth/generate-tokens";
import { sequelize } from "./sequelize";

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

class ChatMessageModel extends Model<Omit<ChatMessage, "User">> {}

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

UserModel.hasMany(ChatMessageModel, { foreignKey: "userID" });
ChatMessageModel.belongsTo(UserModel, {
  foreignKey: "userID",
  targetKey: "id",
});

export class Database {
  async initialize() {
    try {
      await this.createTablesIfNotExist();
    } catch (error) {
      throw error;
    }
  }

  private async createTablesIfNotExist() {
    await sequelize.sync({ force: false });
  }

  async findUser(username: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { username } });
  }

  async createUser(user: User): Promise<UserModel> {
    return await UserModel.create(user);
  }

  async addToChatHistory(
    chatMessage: Omit<ChatMessage, "User">,
  ): Promise<ChatMessageModel> {
    return await ChatMessageModel.create(chatMessage);
  }

  async getFullChatHistory(): Promise<ChatMessageModel[]> {
    return await ChatMessageModel.findAll({
      include: [{ model: UserModel, attributes: ["username"] }],
      order: [["timestamp", "ASC"]],
    });
  }
}
