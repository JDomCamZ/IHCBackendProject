const express = require('express');
const base64 = require('base64-url');
const router = express.Router();
const path = require('path');

const Student = require('../models/student');
const Course = require('../models/courses');

//Todos los datos de todos los alumnos

router.get('/', async (req, res) => {
    
    const students = await Student.find();
    console.log(students);
    res.json(students);

});

//Obtener todos los datos de un alumno

router.get('/:code', async (req, res) => {
    
    const student = await Student.findOne({code: req.params.code});
    res.json(student);

});

//Obtener nombre del alumno

router.get('/:code/name', async (req, res) => {
    
    const student = await Student.findOne({code: req.params.code});
    res.json(student.name);

});

//Obtener turno del alumno

router.get('/:code/turn', async (req, res) => {
    
    const student = await Student.findOne({code: req.params.code});
    res.json(student.turn);

});

//Obtener cursos disponibles del alumno

router.get('/:code/courses', async (req, res) => {

    const student = await Student.findOne({code: req.params.code});
    const courses = await Course.aggregate([
        { $match: {semester: student.semester}},
        { $group: { _id: "$title", code: { $first: "$code"}}}
    ]);
    //const courses = await Course.find({semester: student.semester}).distinct("title");
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
    const imageName = req.params.code + ".jpg";
    const imagePath = path.join(__dirname, '..', 'images', imageName);
    res.sendFile(imagePath);
  });

//Actualizar lista de cursos matriculados del alumno

router.put('/:code/enrolled', async (req, res) => {
    const { enrolled } = req.body;
    const newEnrolled = { enrolled };
    await Student.findOneAndUpdate({code: req.params.code}, newEnrolled);
    res.json({status: 'Enrolled Courses Updated'});
})

//Obtener lista de horarios disponibles para el alumno

router.get('/:code/schedule', async (req, res) => {
    const student = await Student.findOne({code: req.params.code});
    const courses = student.enrolled;
    const turns = [];
    for (let i = 0; i < courses.length; i++) {
        turns.push(await Course.find({code: courses[i]}));
    };
    //console.log(turns);
    for (let i = 0; i < turns.length; i++) {
        for (let j = 0; j < turns[i].length; j++) {
            console.log(turns[i][j].title);
            console.log(turns[i][j].section);
            console.log(turns[i][j].days);
            console.log(turns[i][j].start);
            console.log(turns[i][j].finish);
            console.log(turns[i][j].teacher);
        }
    }
    res.json(turns);
});

module.exports = router;