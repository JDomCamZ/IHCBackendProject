const express = require('express');
const router = express.Router();

const Course = require('../models/courses');

router.get('/', async (req, res) => {
    
    const courses = await Course.aggregate([
        { $group: { _id: "$title", code: { $first: "$code"}}}
    ]);
    console.log(courses);
    res.json(courses);

});

router.get('/:id', async (req, res) => {
    
    const course = await Course.findByID(req.params.id);
    res.json(course);

});

router.post('/', async (req, res) => {

    const { title, code, career, credits, section, days, start, finish, teacher } = req.body;
    const course = new Course({ title, code, career, credits, section, days, start, finish, teacher });
    await course.save();
    res.json({status: 'Course Saved'});

});

router.put('/:id', async (req, res) =>{

    const { title, code, career, credits, section, days, start, finish, teacher } = req.body;
    const newCourse = { title, code, career, credits, section, days, start, finish, teacher };
    await Course.findByIdAndUpdate(req.params.id, newCourse);
    console.log(req.params.id);
    res.json({status: 'Course Updated'});

});

router.delete('/:id', async (req, res) => {

    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Course Deleted'});

});

module.exports = router;