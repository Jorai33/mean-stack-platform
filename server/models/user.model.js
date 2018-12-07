import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db_credentials from '../db_credentials.json';

const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    hash_password: {
        type: String,
        required: true
    }
})

User.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
}

User.methods.generateToken = function() {
    const expiry = new Date();

    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime())
    }, db_credentials.secret)
}

export default mongoose.model('users', User);