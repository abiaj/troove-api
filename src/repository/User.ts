
import  { User } from "../entity/User";
import { getManager } from "typeorm";

export class UserRepo {

    getAllUsers() {
        // get Employee repository and find all employees
        return getManager().getRepository(User).find();
    }

    createUser(user: User) {
          return getManager().getRepository(User).save(user);
    }

}
