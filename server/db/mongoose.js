const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose}

//exporting mongoose = mongoose configured and get it back
