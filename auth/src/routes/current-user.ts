import express from "express";
import {Response, Request} from "express";

const router = express.Router();

router.get("/api/users/currentuser", 
    // currentUser, 
    (req: Request, res: Response) => {
    // res.send({currentUser: req.currentUser || null}); //attached to the currentuser middleware
    // res.send({currentUser: req.session?.jwt || null});
    
    
    if(req.session?.jwt) {
        res.send({currentUser: req.session.jwt});
    }
    else {
        res.send({currentUser: null});
    }   
});

export { router as currentUserRouter };

