//  lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import "reflect-metadata";


class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/CRMdb';


    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
       this.app.use(express.static('public'));
    }
    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl , { useNewUrlParser: true} );
    }

}

export default new App().app;
