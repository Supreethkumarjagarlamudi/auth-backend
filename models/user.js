import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    LastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    Email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    Password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 6 characters"]
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;