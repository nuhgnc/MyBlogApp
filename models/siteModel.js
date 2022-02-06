const mongoose = require('mongoose');
const siteSchema = new  mongoose.Schema({
    HomeImage: {type:string, required:"cannot be anpty"},
    HomeText: {type:string, required:"cannot be anpty"},
    aboutImage: {type:string, required:"cannot be anpty"},
    ContactImage: {type:string, required:"cannot be anpty"},
    ContactText: {type:string, required:"cannot be anpty"},
})

module.exports = mongoose.model('site', siteSchema);