import * as mongoose from 'mongoose';
import { UserSchema } from '../models/User';
import { Request, Response } from 'express';
import { UserRepo } from "../repository/User";
import  { User } from "../entity/User";

//nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


const UserModel = mongoose.model('User', UserSchema);

export class UserController{

   private saltRounds = 10;

   constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {

    }

    async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
    }
    async getUserByUsername(username: string): Promise<User> {
    return (await this.userRepository.find({ username }))[0];
    }

    async createUser(user: User): Promise<User> {
      let userRepo: UserRepo = new UserRepo();
      user.passwordHash = await this.getHash(user.password);
      // clear password as we don't persist passwords
      user.password = undefined;

      console.log(req.body);
      let user:User = new User();
      user.name = req.body.name;
      user.username = req.body.username;
      user.email = req.body.email;
      //user.password = req.body.password;
      user.phoneNumber = req.body.mobileprefix+req.body.phoneNumber;
      user.gender = req.body.gender;
      user.userType = req.body.userType;
      userRepo.createUser(user).then((result: any) => {
          console.log("Result : " + result);
          res.status(200).send({
              data: result,
              message: 'User created successfully'
          })
      });
    }

    async getHash(password: string|undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
      return bcrypt.compare(password, hash);
    }

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
}
