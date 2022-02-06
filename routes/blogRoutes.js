

const   express = require('express'),
        Blog          = require('../models/blogModel'),
        router = express.Router();
        



router.get('/AddNewBlog', checkAuthentication, (req,res) => {
res.render('./blog/newBlog');
});

router.post('/AddNewBlog', checkAuthentication, (req,res) => {
    let     blogTitle       =req.body.data.blogTitle,
            comSentence     =req.body.data.comSentence,
            comImage        =req.body.data.comImage,
            blog            =req.body.data.blog;

    let newBlog = {blogTitle:blogTitle, comSentence:comSentence, comImage:comImage, blog:blog}

        console.log(newBlog.blogTitle);
        console.log(newBlog.comImage)

    Blog.create(newBlog)
    .then((newBlog)=>{
        console.log(newBlog);
        res.status(201).json(newBlog);

    })
    .catch((err) =>{
        console.log('***ERROR***');
        console.log(err);
        res.send(err)
    })

});

router.get('/blogs/:blogId',(req,res)=>{

    
    Blog.findById(req.params.blogId)
        .then((foundBlog)=>{
            res.render('blog/showBlogs',{foundBlog:foundBlog});
        })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });

});

router.get('/test',(req,res)=>{

    
    Blog.find()
        .then((foundBlogs)=>{
            res.json(foundBlogs);
        })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });

});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
       
        next();
    } else{
        
        res.redirect("/login");
    }
}

module.exports =  router;