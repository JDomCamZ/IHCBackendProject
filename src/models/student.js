const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaStudent = new Schema ({
    name: { type: String, required: true},
    code: { type: String, required: true},
    career: { type: String, required: true},
    semester: { type: Number, required: true},
    credits: { type: Number, required: true},
    turn: { type: Number, required: true},
    enrolled: { type: Array, required: false}
});

module.exports = mongoose.model('Student', SchemaStudent);