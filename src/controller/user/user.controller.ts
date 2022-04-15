import { Router } from "express";
import users from "../../handler/user.handler";
import { adminRole, userRole, authenticate } from "../../middleware/auth.middleware";

const user = Router();

user.post('/register', users.register);
user.post('/login', users.login)
user.get('/', authenticate, adminRole, users.index);// protected
user.get('/:id', authenticate, adminRole, users.show);// protected
user.delete('/:id', authenticate, adminRole, users.destroy);// protected

export default user;
