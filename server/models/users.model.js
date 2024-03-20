import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profilePicture: {
        type: String,
        require: false,
    },
    gender: {
        type: String,
        require: true,
    },
}, {timestamps: true});

const Users = mongoose.model('Users', UserSchema);

export default Users;