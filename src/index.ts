import 'reflect-metadata';
import { Container } from 'typedi';
import { DatabaseService } from './config/db';
import express from 'express';
import { Logger } from './config/log';


async function startServer() {
    //db
   const dbService = Container.get(DatabaseService);
   const client = dbService.getClient();
   const db = dbService.getDb();
   
   //express
   const app = express();
   const port= 3000;

   //logger
   const logger = Container.get(Logger);

   app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
   })
}

startServer();