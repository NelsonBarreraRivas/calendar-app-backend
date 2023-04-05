import { parse, isValid} from "date-fns";

export const isDate =  ( value ) => {
    
    if( !value ) return false

    if( isValid(value) ) return true

    else return false
    
}


/* router.post('/',
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio invalida').isISO8601().toDate(),
        check('end').isISO8601().toDate()
        .custom(( end, { req } ) => end >= req.body.start ).withMessage('Fechas invalidas'),
        validarCampos
    ],
    crearEvento
) */