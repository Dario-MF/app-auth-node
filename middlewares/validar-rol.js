






const esAdminRole = (req, res, next)=> {

    if(!req.usuario){
        res.status(500).json({
            msg: 'Se intenta validar el rol sin validar primero el token'
        });
    };
    const { rol, name } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        res.status(401).json({
            msg: 'Es necesario rol administrador.'
        });
    };


    next()

};

const tieneRol = (...roles) => {
    
    return (req, res, next)=> {

        if(!req.usuario){
            res.status(500).json({
                msg: 'Se intenta validar el rol sin validar primero el token'
            });
        };

        if ( !roles.includes( req.usuario.rol ) ) {
            res.status(401).json({
                msg: 'No tiene permisos suficientes para realizar esta operación.'
            });
        };


        next()
    }
}


module.exports = {
    esAdminRole,
    tieneRol
};