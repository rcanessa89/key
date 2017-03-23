import userSchema from './user.model';
import Handler from '../../services/Handler';

const userHandler = new Handler(userSchema);

export default class UserHandler {
    public static getUsers(req, res, next): void {

    }

    public static getUserById(req, res, next): void {

    }

    public static createUser(req, res, next): void {
        userHandler.create(req.body);
    }

    public static editUser(req, res, next): void {

    }

    public static deleteUser(req, res, next): void {

    }
}