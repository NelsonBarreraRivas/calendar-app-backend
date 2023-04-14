import moment from 'moment'

export const isDate =  ( value ) => {
    
    if( !value ) return false

    const date = moment( value )


    if( date.isValid() ) return true

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