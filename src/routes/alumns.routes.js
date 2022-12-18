const express = require('express');
const router = express.Router();

const Student = require('../models/student');

router.get('/', async (req, res) => {
    
    const students = await Student.find();
    console.log(students);
    res.json(students);

});

router.get('/:code/turn', async (req, res) => {
    
    const course = await Student.findOne({code: req.params.code});
    res.json(course.turn);

});