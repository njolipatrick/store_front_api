import { Router } from "express";
import users from "../../handler/user.handler";
import { adminRole, userRole, authenticate } from "../../middleware/auth.middleware";

const user = Router();

user.post('/register', users.register);
user.get('/', users.index);// protected
user.get('/:id', users.show);// protected
user.post('/login', users.login);// protected
user.delete('/:id', users.destroy);// protected

export default user;
