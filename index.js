const mongoose        = require('mongoose'),
      express         = require('express'),
      bodyParser      = require ('body-parser'),
      passport        = require('passport'),
      localStrategy   = require('passport-local'),
      session         = require('express-session'),
      User            = require ('./models/userModel'),
      app             = express();


//ROUTES
const indexRoutes = require('./routes/indexRoutes');
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes  = require ('./routes/blogRoutes');


//APP CONFİG
mongoose.connect('mongodb://localhost/BlogApp');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


//PASSWORD CONFİG
app.use(require("express-session")({
    secret:"karakedi",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use( new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//CURRENT USER
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    
    
      
    next();
    });


//ROUTES USİNG
app.use(indexRoutes);
app.use(adminRoutes);
app.use(blogRoutes);
app.use("",(req,res)=>{
    res.send('sayfa bulunamadı');
})

//SERVER CONNECTİON
const server = app.listen(3000, (req,res,err) => {
    if (err){
        console.log(err);
    }
        console.log('app Started, port Number : %d' , server.address().port,);
        
})
