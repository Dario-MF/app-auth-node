const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        default: 'Sin descripcion'
    },
    img: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    estado: {
        type: String,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
}, {
    versionKey: false,
    timestamps: true
});

productoSchema.methods.toJSON = function () {
    const { estado, ...data } = this.toObject();
    return data;
};


module.exports = model('Producto', productoSchema);