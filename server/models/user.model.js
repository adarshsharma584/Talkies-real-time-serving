import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        // we will create a sparse unique index so documents without email are allowed
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    // avatar: {
    //     type: String,
    //     default: 'https://www.gravatar.com/avatar/'
    // },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    refreshToken: {
        type: String,
        default: '',
        select: false
    },
}, {
    timestamps: true,
}
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const User = mongoose.model('User', userSchema);
export default User;
// Ensure a sparse unique index on email to avoid duplicate null issues
try {
    userSchema.index({ email: 1 }, { unique: true, sparse: true });
} catch (err) {
    // index creation may fail if an incompatible index already exists in the DB
    console.warn('Could not create sparse unique index on users.email:', err.message);
}