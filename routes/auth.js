/* -------------------------------------------------------------------------- */
/*                               imports package                              */
/* -------------------------------------------------------------------------- */
import { Router } from "express"
import { check } from "express-validator";
import { register, login, revalidate } from "../controllers/auth.js"
import { fieldsValidator } from "../middlewares/fields-validator.js";
import { jwtValidator } from "../middlewares/jwt-validator.js";
/* -------------------------------------------------------------------------- */
/*                          Rutas de Usuarios / Auth                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                               host + api/auth                              */
/* -------------------------------------------------------------------------- */

const router = Router()

router
    .post(
        '/new',
        [// INFO  : midleware
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
            fieldsValidator
        ],
        register
    )

router
    .post(
        '/',
        [// INFO  : midleware
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
            fieldsValidator
        ],
        login
    )

router
    .get( '/renew', jwtValidator, revalidate )



export default router