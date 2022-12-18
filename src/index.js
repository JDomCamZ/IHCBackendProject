const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose } = require('./database')

//Configuracion

app.set('port', process.env.PORT || 3000);

//Middleware

app.use(morgan('dev'));
app.use(express.json());

//Rutas

app.use('/api/courses', require('./routes/courses.routes'));

//Archivos Estaticos

//app.use(express.static(path.join(__dirname, 'public')));

//Empezando a correr el server

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
});