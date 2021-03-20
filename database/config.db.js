const mongoose = require('mongoose');
require('dotenv').config();
require('colors')


const dbConnection = async() => {
    try {

       await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
       });

       console.log('Base de datos conectada.'.green)
        
    } catch (error) {
        console.log(error)
        throw new Error('Error: no se pudo conectar a la base de datos.'.red);
    }
}


module.exports = {
    dbConnection
}