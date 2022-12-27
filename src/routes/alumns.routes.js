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
        { $group: { _id: "$title", code: { $first: "$code" }, credits: { $first: "$credits" }}}
    ]);
    //const courses = await Course.find({semester: student.semester}).distinct("title");
    console.log(courses);
    res.json(courses);
})

//Generar alumnos

router.post('/', async (req, res) => {

    const { name, code, semester, credits, turn } = req.body;
    const student = new Student({ name, code, semester, credits, turn});
    await student.save();
    res.json({status: 'Student Saved'});

});

//Obtener imagen del alumno

router.get('/:code/image', async (req, res) => {
    const imageName = req.params.code + ".jpg";
    const imagePath = path.join(__dirname, '..', 'images', imageName);
    res.sendFile(imagePath);
  });

//Obtener créditos del alumno

router.get('/:code/credits', async (req, res) => {
    const student = await Student.findOne({code: req.params.code});
    res.json(student.credits);
  });

//Actualizar lista de cursos matriculados del alumno

router.put('/:code/enrolled', async (req, res) => {
    const { enrolled } = req.body;
    const newEnrolled = { enrolled };
    await Student.findOneAndUpdate({code: req.params.code}, newEnrolled);
    res.json({status: 'Enrolled Courses Updated'});
})


const backtrack = (schedules, schedule, i, turns) => {
    
    if(i >= 0){
        for(let iday = 0; iday < schedule[i].days.length; iday++){
            //verificando que no hay cruces
            for(let j = 0; j < i; j++){
                for(let jday = 0; jday < schedule[j].days.length; jday++){
                    let start_intersection = Math.max(schedule[i].start[iday], schedule[j].start[jday]);
                    let finish_intersection = Math.min(schedule[i].finish[iday], schedule[j].finish[jday]);
                    if(schedule[i].days[iday] == schedule[j].days[jday] && start_intersection < finish_intersection){
                        //existe cruze
                        return;
                    }
                }
            }
        }
    }

    if(i+1 == turns.length){
        schedules.push(schedule.slice());
        return;
    }

    for(let j = 0; j < turns[i+1].length; j++){
        schedule.push(turns[i+1][j]);
        backtrack(schedules, schedule, i+1, turns);
        schedule.pop();
    }

};
const getSchedules = (turns) => {
    const schedules = [];
    const schedule = [];
    backtrack(schedules, schedule, -1, turns);
    return schedules;
};

router.get('/:code/schedule', async (req, res) => {
    const student = await Student.findOne({code: req.params.code});
    const courses = student.enrolled;
    const turns = [];
    for (let i = 0; i < courses.length; i++) {
        turns.push(await Course.find({code: courses[i]}));
    };

    const schedules = getSchedules(turns);
    res.json(schedules);

});


module.exports = router;