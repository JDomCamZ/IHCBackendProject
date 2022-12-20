const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaCourses = new Schema ({
    title: { type: String, required: true},
    code: { type: String, required: true},
    semester: { type: String, required: true},
    section: { type: String, required: true},
    days: { type: Array, required: true},
    start: { type: Array, required: true},
    finish: { type: Array, required: true},
    teacher: { type: String, required: true}
});

module.exports = mongoose.model('Course', SchemaCourses);