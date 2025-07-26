import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';


const authorize = async (req, res, next) => {
    try{
        let token;


        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({ message: 'Unauthorized, no token provided'});
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized, user not found'});
        }
        req.user=user;

        next();
    }catch(error){
        res.status(401).json({success: false, message: 'Unauthorized' , error: error.message});
    }
}

export default authorize;

//Basically whats happening here is
//if someone makes a request to get user details-> we authorise it using middleware -> verify it -> if valid(i.e. if they have permissions)
//  -> go over to next step and give them the user details