import "dotenv/config";
import { Service } from 'typedi';
import 'reflect-metadata';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


@Service()
export class DatabaseService {
    private client ; 
    private db;
    constructor() {
        try {
            const connectionString = process.env.DB_URL;
            if(!connectionString){
                throw new Error("No connection string found");
            }
            this.client = postgres(connectionString);
            this.db = drizzle(this.client);
            console.log("Database connected");
        } catch (error) {
            console.error('Database connection error:', error);
        }
    }
    getClient(){
        return this.client;
    }
    getDb(){
        return this.db;
    }
}