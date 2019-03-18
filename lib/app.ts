//  lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import "reflect-metadata";
import {User} from "./entity/User";


createConnection().then(async connection => { 
  class App {

      public app: express.Application = express();
      public routePrv: Routes = new Routes();
      public mongoUrl: string = 'mongodb://localhost/CRMdb';


      constructor() {
          this.config();
          this.mongoSetup();
          this.routePrv.routes(this.app);
          const user = new User();
          user.firstName = "Timber";
          user.lastName = "Saw";
          user.age = 25;
          await connection.manager.save(user);
          console.log("Saved a new user with id: " + user.id);

          console.log("Loading users from the database...");
          const users = await connection.manager.find(User);
          console.log("Loaded users: ", users);

          console.log("Here you can setup and run express/koa/any other framework.");


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
}).catch(error => console.log(error));

export default new App().app;
