const mongoose = require("mongoose");

const DBCourses = 'mongodb://127.0.0.1/courses';

mongoose.connect(DBCourses)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;