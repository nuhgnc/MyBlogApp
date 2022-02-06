const   express         = require('express'),
        User            = require('../models/userModel'),
        passport        = require('passport'),
        localStrategy   = require('passport-local'),
        bodyParser      = require ('body-parser'),
        router          = express.Router();

        
//router.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
//router.use(bodyParser.json())


let adminActions = [
    {
        actionId: 1,
        actionName: "changeHomeImage",
        displayName: "change Home Image"
    },
    {
        actionId: 2,
        actionName: "changeAboutImage",
        displayName: "change About Image"
    },
    {
        actionId: 3,
        actionName: "changeAboutText",
        displayName: "change About Text"
    },
    {
        actionId: 4,
        actionName: "AddNewBlog",
        displayName: "Add New Blog"
    },
    {
        actionId: 5,
        actionName: "ListAllBlog",
        displayName: "List All Blog"
    } 
];

router.post('/login', passport.authenticate("local",
{
    successRedirect: "/",
    failureRedirect:"/login"
}),(req,res,next) =>{});

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect("/")

})

router.get('/login', (req,res) => {
    res.render('admin/login');
});

router.post('/signup',checkAuthentication,(req,res)=>{
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user) =>{

        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        passport.authenticate("local")(req,res, () => {
            res.redirect("/");
        });
    });
    
   
});
router.get('/signup', checkAuthentication,(req,res) => {
    res.render('admin/signup');
});
router.get('/admin', (req,res) => {
    res.render('admin/admin',{adminActions: adminActions});
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

module.exports = router;