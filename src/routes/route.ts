import {Request, Response, NextFunction} from "express";
import "reflect-metadata";
import {createConnection} from "typeorm";
import { UserController } from "../controllers/UserController";

export class Routes {

    public userController: UserController = new UserController()

    public routes(app): void {
        //User Related routes
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Troove api server working fine'
            });
        });
        app.route('/users').get((req: Request, res: Response) => {
            res.status(200).send({
                data: [],
                message: 'All users list'
            });
        });
        app.route('/signup').post(this.userController.signup);
        app.route('/login').post(this.userController.login);

        //Need to add payload validation
        app.route('/user/list').get(this.userController.getAllUsers);
        app.route('/create/user').post(this.userController.createUser);

        // // Contact detail
        // app.route('/contact/:contactId')
        // // get specific contact
        // .get(this.contactController.getContactWithID)
        // .put(this.contactController.updateContact)
        // .delete(this.contactController.deleteContact)

    }
}
