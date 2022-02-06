const express = require('express');
const Blog    = require('../models/blogModel');
const router = express.Router();




router.get('/', (req,res) => {
    Blog.find({},(err,foundBlogs) =>{
        if(err){
            console.log("*****ERROR*****");
            console.log(err);
            res.send(err);
        }else{
            console.log('***** ALL BLOGS ******');
            console.log(foundBlogs);
            res.render('home', {foundBlogs:foundBlogs});
        }
    })
    
});
router.get('/about', (req,res) => {
    res.render('about');
});
router.get('/post', (req,res) => {
    res.render('post');
});
router.get('/contact', (req,res) => {
    res.render('contact');
});
router.get('/signup', (req,res) => {
    res.render('admin/signup');
});
router.get('/resume', (req,res) => {
    res.render('resume');
});

module.exports = router;