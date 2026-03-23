import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();

const uri = process.env.MONGO_URI || "uri";

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log("Connect to MongoDB");
  } catch (error) {
    console.error("Faild to connect to MondoDB", error);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}
