const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaStudent = new Schema ({
    name: { type: String, required: true},
    code: { type: String, required: true},
    semester: { type: String, required: true},
    turn: { type: Number, required: true}
});

module.exports = mongoose.model('Student', SchemaStudent);