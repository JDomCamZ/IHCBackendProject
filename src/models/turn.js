const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaTurn = new Schema ({
    number: { type: Number, required: true},
    hour: { type: String, required: true}
});

module.exports = mongoose.model('Turn', SchemaTurn);