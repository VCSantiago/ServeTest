const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL || "mongodb://localhost:27017/agoravai", {useUnifiedTopology: true,
useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;