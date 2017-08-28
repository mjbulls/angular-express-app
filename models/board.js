const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
    title : String,
    content : String,
    regDt : String
});


module.exports = mongoose.model('Board', Board);