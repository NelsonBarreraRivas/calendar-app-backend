import express from "express";
import { validationResult } from "express-validator";

export const fieldsValidator = async (req = express.request, res = express.response, next ) => {
    
    const errors = validationResult( req )

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next()
}