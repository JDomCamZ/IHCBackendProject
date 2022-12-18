const express = require('express');
const router = express.Router();

const Student = require('../models/student');
const Course = require('../models/courses');

router.get('/', async (req, res) => {
    
    const students = await Student.find();
    console.log(students);
    res.json(students);

});

router.get('/:code/turn', async (req, res) => {
    
    const student = await Student.findOne({code: req.params.code});
    res.json(student.turn);

});

router.get('/:code/courses', async (req, res) => {

    const student = await Student.findOne({code: req.params.code});
    const courses = await Course.find({semester: student.semester});
    console.log(courses);
    res.json(courses);
})