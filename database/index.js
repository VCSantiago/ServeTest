const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL || "mongodb+srv://santiago:santiago@cluster0-vwd1f.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true,
useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = mongoose;