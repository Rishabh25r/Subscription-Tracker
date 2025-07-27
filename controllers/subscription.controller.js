import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';
export const createSubscription = async (req , res , next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body:{
                subscriptionId: subscription._id,
            },
            headers:{
                'content-type': 'application/json',
            },
            retries: 0,

        })

        res.status(201).json({success:true , data:{subscription , workflowRunId}});
    }catch(e){
        next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        //check if the user is the same as in the token , i.e. a user can demand only his own subscription , not somebody else's
        if(req.user.id !== req.params.id){
            const error = new Error('You are not authorized to view this user\'s subscriptions');
            error.status = 403; // Forbidden
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({success: true, data: subscriptions});
    }catch(e){
        next(e);
    }   
}