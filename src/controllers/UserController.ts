import * as mongoose from 'mongoose';
import { UserSchema } from '../models/User';
import { Request, Response } from 'express';
import { UserRepo } from "../repository/User";
import  { User } from "../entity/User";

const UserModel = mongoose.model('User', UserSchema);

export class UserController{

    //Using mongo
    public signup (req: Request, res: Response) {
        let newUser = new UserModel(req.body);

        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
    //Using mongo
    public login (req: Request, res: Response) {
        res.status(200).send({
            data: [],
            message: 'Login success'
        })
    }

    //Using Mysql
    public getAllUsers(req: Request, res: Response) {
        let userRepo: UserRepo = new UserRepo();

        console.log("Received GetAllEmployees ==> GET");

        userRepo.getAllUsers().then((result: any) => {
            console.log("Result : " + result);
            res.status(200).send({
                data: result,
                message: 'User list success'
            })
        });
    }

    public createUser (req: Request, res: Response) {
        let userRepo: UserRepo = new UserRepo();

        console.log("Received SaveEmployee ==> POST");
        console.log(req.body);

        let user:User = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.mobileprefix = req.body.mobileprefix;
        user.mobile = req.body.mobile;
        user.password = req.body.password; //Need to encrypt by algo
        userRepo.createUser(user).then((result: any) => {
            console.log("Result : " + result);
            res.status(200).send({
                data: result,
                message: 'User created successfully'
            })
        });
    }

}
