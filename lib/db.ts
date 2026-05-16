import mongoose from "mongoose";

// 1. Define the interface for our cached object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. Extend the NodeJS global type to include our cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGO_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function connectDB() {
  if (cached!.conn) {
    console.log("Using cached MongoDB connection");
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Initiating new MongoDB connection...");
    
    // START FIX: Actually call mongoose.connect
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
    // END FIX
  }

  try {
    cached!.conn = await cached!.promise;
    console.log("Connected to MongoDB successfully");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    cached!.promise = null; // Reset promise so we can try again
    throw e;
  }
  
  return cached!.conn;
}
export default connectDB;
