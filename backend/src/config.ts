import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const DB_URI = process.env.MONGO_URI;
export const DB_NAME = process.env.MONGO_DB_NAME || "ListSmart";
export const DB_COLLECTION = process.env.MONGO_DB_COLLECTION || "ListOfLists";
