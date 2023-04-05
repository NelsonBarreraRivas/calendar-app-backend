import express from "express"
import { User } from "../models/User.js";
import { generateJWT } from "../helpers/jwt.js";

const register = async (req = express.request, res = express.response) => {

    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo se encuentra en uso'
            })
        }

        user = new User(req.body)

        await user.save()

        const token = await generateJWT( user.id, user.name )

        res.status(201).json({
            ok: true,
            msg: 'registro',
            uid: user.id,
            name: user.name,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el Administrador'
        })

    }
}

const login = async (req = express.request, res = express.response) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            })
        }

        // ! comprobar password
        if (await user.authentication(password)) {

            const token = await generateJWT( user.id, user.name )

            return res.status(200).json({
                ok: true,
                uid: user.id,
                name: user.name,
                token: token
            })

        } else {
            return res.status(403).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            })
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el Administrador'
        })
    }
}

const revalidate = async (req = express.request, res = express.response) => {

    const user = req.user

    const token = await generateJWT( user.id, user.name )

    res.status(201).json({
        ok: true,
        msg: 'renew',
        token
    })
}

export {
    register,
    login,
    revalidate
}