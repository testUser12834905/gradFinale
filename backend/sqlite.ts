import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
`);

const query = db.query("select * from users;");
const msg = query.get();

console.log(msg);
