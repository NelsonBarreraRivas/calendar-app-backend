import { Schema, model } from 'mongoose'
import bcrypt from "bcrypt"

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    photoURL:{
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false,
    }
})


userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) return next()

    const salt = await bcrypt.genSalt()
    this.password =  await bcrypt.hash(this.password, salt)
})
userSchema.methods.authentication = async function (password) {
    return bcrypt.compareSync(password, this.password)
}


export const User = model('User', userSchema)