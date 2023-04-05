import express from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import mongoose from "mongoose"

export const jwtValidator = async (req = express.request, res = express.response, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        const token = req.headers.authorization.split(' ')[1];

        try {

            const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED)

            const isValid = mongoose.Types.ObjectId.isValid(uid)

            if (!isValid) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Algo salio mal, intentelo más tarde'
                })
            }

            req.user = await User.findById(uid).select("-password -email -createdAt -updatedAt -__v")

            return next()

        } catch (error) {
            console.error(error);
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            })
        }

    } else {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token de petición'
        })
    }
}