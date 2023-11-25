import express from "express"
import passport from "passport"
import "./auth.js"
import session from "express-session"


function isLoggedIn(req,res,next){
    req.user ? next(): res.sendStatus(401);
}

const app=express();
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());
app.get(express.json())


app.get('/auth/google',
   passport.authenticate('google',{scope:['email','profile']})
)

app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Authonticate with Google</a>');
});


app.get('/google/callback',
  passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure',
  })
);


app.get('/protected',isLoggedIn,(req,res)=>{
    res.send('Hello!');
});

app.get('/auth/failure',(req,res)=>{
    res.send('something went wrong..');
}) 

app.use('/logout',(req,res)=>{
    req.session.destroy();
    res.send('Goodbye!');
})

app.get("/htm",(req,res)=>{
    res.sendFile("C:/Users/vijay/OneDrive/Documents/gitin/dist/index.html")
})

app.listen(5000,()=>console.log('Listening on: 5000'));
