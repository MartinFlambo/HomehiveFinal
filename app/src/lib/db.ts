import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("No se encontró MONGODB_URI en el archivo .env");
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
