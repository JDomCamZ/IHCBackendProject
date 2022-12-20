const mongoose = require("mongoose");

const DBMatricula = 'mongodb://127.0.0.1/MatriculaUNI';

mongoose.connect(DBMatricula)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;