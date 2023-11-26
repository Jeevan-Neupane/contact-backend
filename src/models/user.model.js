import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })


//*We need to hash the password before saving to the database


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();

    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password);

}



userSchema.methods.generateToken = async function () {

    const payload = {
        id: this._id
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    })
}

export const User = mongoose.model("User", userSchema);