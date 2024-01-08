import express from "express";
import { body } from "express-validator";//validates incoming data from the body of the post request    
import { Request, Response } from "express";
import { BadRequestError, validateRequest}from "@umukorog-tickets/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken"; 

const router = express.Router();

router.post("/api/users/signin", [
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password")
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
    }   
    
    const passwordsMatch = await Password.compare(existingUser.password, password);
    if(!passwordsMatch) {
        throw new BadRequestError("Invalid credentials");
    }


    //generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);
    //the ! tells typescript that we know that the JWT_KEY is defined
    //because we checked for it in index.ts before starting the server

    //store it on session object
    req.session = {
        jwt: userJwt
    };
    
    res.status(200).send(existingUser);
});

export { router as signinRouter };
