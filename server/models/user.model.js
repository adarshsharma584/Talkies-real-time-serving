import mongoose from 'mongoose';

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
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/'
    },
    gender:{
        type:String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    refreshToken:{
        type:String,
        default: ''
    },
},{
    timestamps: true,
}
);

const User = mongoose.model('User', userSchema);
export default User;