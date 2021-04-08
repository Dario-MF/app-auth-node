const { response } = require("express");
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { subirArchivos } = require("../helpers");
const { Usuario, Producto } = require("../models");



const imgDefault = path.join(__dirname, '../assets/no-image.jpg');

const cargarArchivos = async (req, res = response) => {
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

const actualizarArchivo = async (req, res) => {
    const { coleccion, id } = req.params;
    let modelo;
    try {
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    res.status(400).json({
                        error: 'Usuario id no existe'
                    });
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if (!modelo) {
                    res.status(400).json({
                        error: 'Producto id no existe'
                    });
                }
                break;

            default:
                res.status(500).json({ error: 'coleccion no contemplada' })
                break;
        };
        if (modelo.img) {
            const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg);
            }
        }
        const nombre = await subirArchivos(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();
        res.json({
            msg: 'peticion OK',
            modelo
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    };
};

const obtenerArchivos = async (req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;
    try {
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    res.status(404).sendFile(imgDefault);
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if (!modelo) {
                    res.status(404).sendFile(imgDefault);
                }
                break;

            default:
                res.status(500).json({ error: 'coleccion no contemplada' })
                break;
        };
        if (modelo.img) {
            const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
            console.log(fs.existsSync(pathImg))
            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg);
            };
        };


        res.status(404).sendFile(imgDefault);
    } catch (error) {
        res.status(500).json({
            error
        });
    };
};

const actualizarImgCloudinary = async (req, res) => {
    const { coleccion, id } = req.params;
    let modelo;
    try {
        switch (coleccion) {
            case 'usuarios':
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    res.status(400).json({
                        error: 'Usuario id no existe'
                    });
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if (!modelo) {
                    res.status(400).json({
                        error: 'Producto id no existe'
                    });
                }
                break;

            default:
                res.status(500).json({ error: 'coleccion no contemplada' })
                break;
        };
        if (modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

        modelo.img = secure_url;

        await modelo.save();

        res.json({
            msg: 'peticion OK',
            modelo
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    };
};

module.exports = {
    cargarArchivos,
    actualizarArchivo,
    obtenerArchivos,
    actualizarImgCloudinary
};