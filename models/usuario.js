const { Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'nombre is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'email is required'],
        unique: true
    },
    password: { 
        type: String, 
        required: [true, 'password is required'] 
    },
    img:{ 
        type: String 
    },
    rol: { 
        type: String, 
        required: [true, 'rol is required'], 
        emun: ['ADMIN_ROLE', 'USER_ROLE'] 
    },
    state: { 
        type: Boolean, 
        default: true 
    },
    google: { 
        type: Boolean, 
        default: false 
    }
});


UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );