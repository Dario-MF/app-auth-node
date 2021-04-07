const path = require('path');
const { v4: uuidv4 } = require('uuid');



const subirArchivos = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'md'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            return reject(`extension de archivo: ${extension} no permitida, permitidas: ${extensionesValidas}`);
        };
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(nombreTemp);
        });
    });
};


module.exports = {
    subirArchivos
}