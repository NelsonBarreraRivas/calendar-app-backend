/* -------------------------------------------------------------------------- */
/*                               imports package                              */
/* -------------------------------------------------------------------------- */
import { Router, request } from "express";
import { jwtValidator } from "../middlewares/jwt-validator.js";
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} from "../controllers/event.js"
import { check } from "express-validator";
import { fieldsValidator } from "../middlewares/fields-validator.js";
import { isDate } from "../helpers/isDate.js";

/* -------------------------------------------------------------------------- */
/*                           Rutas events / Calendar                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                              host + api/events                             */
/* -------------------------------------------------------------------------- */

const router = Router()

router.use( jwtValidator )

router
    .route('/')
    .get( getEvents )
    .post( [
        check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
        check( 'start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check( 'end', 'Fecha fin es obligatoria').custom( isDate ),
        check( 'end', 'La fecha final tiene que ser mayor a la de inicio').custom( ( end , { req = request } ) => end >= req.body.start ),
        fieldsValidator
    ] ,createEvent )

router
    .route('/:id')
    .put( [
        check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
        check( 'start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check( 'end', 'Fecha fin es obligatoria').custom( isDate ),
        check( 'end', 'La fecha final tiene que ser mayor a la de inicio').custom( ( end , { req = request } ) => end >= req.body.start ),
        fieldsValidator
    ], updateEvent )
    .delete( deleteEvent )


export default router