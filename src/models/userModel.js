import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: [true, 'Username Already Exist']
    },

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email already exist']
    },

    password: {
        type: String,
        required: [true, 'Please enter Password']
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
}, { timestamps: true });

const USER = mongoose.models.users || mongoose.model('users', userSchema);

export default USER;