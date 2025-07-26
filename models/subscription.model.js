import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
 name:{
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minlength: [3, 'Subscription name must be at least 3 characters long'],
    maxlength: [100, 'Subscription name must be at most 50 characters long']
 },
 price:{
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
 },
 currency:{
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'INR' , 'JPY' , 'CNY'],
    default: 'INR', 
 },
 frequency:{
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
 },
category:{
    type: String,
    enum: ['sports', 'entertainment', 'education', 'health', 'technology' , 'news', 'gaming', 'lifestyle' , 'other'],
    required: [true, 'Category is required'],
},
paymentMethod:{
    type: String,
    enum: ['Credit Card', 'Debit Card', 'Paypal', 'Bank Transfer' , 'UPI', 'Crypto' , 'Other'],
    required: [true, 'Payment method is required'],
    trim: true,
},
status:{
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active',
},
startDate:{
    type: Date,
    required: [true, 'Start date is required'],
    validate:{
        validator: (value)=>value <= new Date(),
        message: 'Start date must be in the past'
    }
},
renewalDate:{
    type: Date,
    validate:{
        validator: function(value){
            return value >= this.startDate;
        },
        message: 'Renewal date must be after the start date'
    }
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index:true
}
}, {timestamps: true}); 


//Autocalculate the renewal date if missing
subscriptionSchema.pre('save' , function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;