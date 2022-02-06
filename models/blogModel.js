const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    blogTitle:       { type:String, required:'cannot be empty'},
    comSentence:    { type:String, required:'cannot be empty'},
    comImage:       { type:String, required:'cannot be empty'},
    blog:           { type:String, required:'cannot be empty'},
    date:           {type: Date, default: Date.now}
})


module.exports = mongoose.model('blog', blogSchema);