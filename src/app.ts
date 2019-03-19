import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();
import { Routes } from "./routes/route";
import * as mongoose from "mongoose";
import {createConnection} from "typeorm";
import "reflect-metadata";

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = process.env.MONGO_URL;

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
        this.mysqlConnection();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});
        console.log("MongoDB connection successfully done!! ");
    }

    private mysqlConnection(): void {
        createConnection().then(connection => {
            // here you can start to work with your entities
            console.log("Mysql connection is successfully done!! ");
        }).catch(error => console.log("Mysql connection error ", error));
    }

}

export default new App().app;
