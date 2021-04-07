const { response } = require("express");
const { subirArchivos } = require("../helpers");



const cargarArchivos = async (req, res = response) => {
    if (!req.files || !req.files.archivo || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'no hay archivos mandados' });

    };
    try {
        //const nombre = await subirArchivos(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivos(req.files, undefined, 'imgs');
        res.json({
            msg: 'Archivo cargado, OK',
            nombre
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    };
};


module.exports = {
    cargarArchivos
}