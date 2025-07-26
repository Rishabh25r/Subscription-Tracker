import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username must be at most 50 characters long']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],  
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email must be a valid email address'],
        minlength: [5, 'Email must be at least 5 characters long'],
        maxlength: [100, 'Email must be at most 100 characters long'],
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    }
} , {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;

// This model defines the structure of a User document in MongoDB using Mongoose.
// It includes fields for name, email, and password with validation rules.
//{name:' Rishabh Rokariya', email:'rishabh.22647@knit.ac.in', password: '22647};