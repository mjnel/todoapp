const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ToDoApp");

module.exports = {mongoose}

//exporting mongoose = mongoose configured and get it back
