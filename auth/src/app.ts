import express from "express";
import "express-async-error"; //this package is used to handle async errors
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler, NotFoundError }  from "@umukorog-tickets/common";

const app = express();
app.use(json());
app.set("trust proxy", true);
//this is to make sure that express is aware that it is behind a proxy of 
//ingress-nginx and to make sure that it should still trust traffic as being 
//secure even though it is coming from that proxy
app.use(cookieSession({
  signed:false,
  secure:false,
  // secure: process.env.NODE_ENV !=='test' //returns false if we are in a test environment
//   secure: true // true: cookies can only be used if the user is visiting our app over https connection and not over http connection like testing environment       

}))

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);


app.all('*', async (req,res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };