import { verify } from "jsonwebtoken";
import { User } from "../models/user.model";
const SECRET = String(process.env.TOKEN_SECRET);

export const userinfo = (TOKEN: string): User => {
    const user = verify(TOKEN, SECRET) as unknown as User;

    //@ts-ignore
    return user.user;
}