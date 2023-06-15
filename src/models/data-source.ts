import mongoose from "mongoose";

export class Database {
    static async connect() {
        const DB_URL = 'mongodb://127.0.0.1:27017/customer_manager';
        return await mongoose.connect(DB_URL);
    }
}