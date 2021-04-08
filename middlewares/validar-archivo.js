

const validarArchivoSubir = (req, res, next) => {
    if (!req.files || !req.files.archivo || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'no hay archivos mandados en: header/archivo(file)/su archivo'
        });
    };
    next();
};


module.exports = {
    validarArchivoSubir
}