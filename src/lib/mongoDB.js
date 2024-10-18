import mongoose from "mongoose";

const MONGO_DB_URL = `mongodb://127.0.0.1:27017/chatApp`;
if (!MONGO_DB_URL)
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')

let cached = global.mongoose;
if (!cached)
  cached = global.mongoose = { conn: null, promise: null };

export default async function connectToDatabase() {
  if (cached.conn)
    return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_DB_URL).then(mongoose => {
      console.log("connected to Mongo Atlas");
      return mongoose;
    });

    cached.conn = await cached.promise;
    return cached.conn;
  }
}