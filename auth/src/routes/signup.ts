import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import {User} from "../models/user";
import jwt from "jsonwebtoken";

import {validateRequest, BadRequestError} from "@umukorog-tickets/common"

const router = express.Router();

router.post("/api/users/signup", [
    body('email')//looks at the request body and checks if the email property exists
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,//this is a middleware that we created to handle the validation
    async (req : Request, res: Response) => {
        const {email, password} = req.body;
        
        const existingUser = await User.findOne({email});
        if(existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({email, password});
        await user.save();//save the user to the database

        //generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);
        //the ! tells typescript that we know that the JWT_KEY is defined
        //because we checked for it in index.ts before starting the server

        //store it on session object
        req.session = {
            jwt: userJwt
        };
        
        res.status(201).send(user);

});

export { router as signupRouter };
