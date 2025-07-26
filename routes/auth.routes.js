import {Router} from 'express';
import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const authRouter = Router();


//path: /api/v1/auth/signUp
//This route is used to sign up a new user
authRouter.post('/sign-up' , signUp); 

//path: /api/v1/auth/signIn
//This route is used to sign in the user and generate a JWT token
authRouter.post('/sign-in' , signIn); 

//path: /api/v1/auth/signOut
//This route is used to sign out the user by clearing the JWT cookie
authRouter.post('/sign-out' , signOut);

export default authRouter;