const express = require('express');
const base64 = require('base64-url');
const router = express.Router();

const Student = require('../models/student');
const Course = require('../models/courses');

router.get('/', async (req, res) => {
    
    const students = await Student.find();
    console.log(students);
    res.json(students);

});

//Obtener turno del alumno

router.get('/:code/turn', async (req, res) => {
    
    const student = await Student.findOne({code: req.params.code});
    res.json(student.turn);

});

//Obtener cursos disponibles del alumno

router.get('/:code/courses', async (req, res) => {

    const student = await Student.findOne({code: req.params.code});
    const courses = await Course.find({semester: student.semester});
    console.log(courses);
    res.json(courses);
})

//Generar alumnos

router.post('/', async (req, res) => {

    const { name, code, semester, turn } = req.body;
    const student = new Student({ name, code, semester, turn});
    await student.save();
    res.json({status: 'Student Saved'});

});

//Obtener imagen del alumno

router.get('/:code/image', async (req, res) => {
    
    const student = await Student.findOne({code: req.params.code});
    const imagen_base64 = student.image;

    // Convertir la cadena en formato base64 a bytes
    const imagen_bytes = base64.decode(imagen_base64);

    // Enviar la imagen en la respuesta de la API
    res.send(imagen_bytes);

});

module.exports = router;