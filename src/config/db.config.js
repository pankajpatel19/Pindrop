import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_URL = process.env.DATABASE_URL;

if (!MONGO_URL) {
  throw new Error("Please Define db connection in env file");
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const ConnectDB = async () => {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URL);
    console.log("Connection SuccessFUlly");
  }
  cache.conn = cache.promise;

  return cache.conn;
};

export default ConnectDB;
