import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'GUEST'
    },
    active: {
        type: Boolean,
        default: true
    },
    created_at:{
        type: Date,
    },
    lastLogin:{
        type: Date,
        default: new Date()
    }

}, 
{ versionKey: '_v1' })


const User = mongoose.model('User', UserSchema);

export default User;