const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'LA categoría es obligatoria']
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
    }
}, {
    versionKey: false,
    timestamps: true 
});

categoriaSchema.methods.toJSON = function() {
    const { estado, ...data} = this.toObject();
    return data;
};

module.exports = model('Categoria', categoriaSchema);