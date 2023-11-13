require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
// const expressLayouts = require('express-ejs-layouts');



const app = express()
const PORT = process.env.PORT || 4000

//db connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error",(error) => console.log(error));
db.once("open",() => console.log('Connected to database'));

//Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
  }));

  app.use((req, res, next) => {
    res.locals.message = req.session ? req.session.message : undefined;
    if (req.session) {
      delete req.session.message;
    }
  
    next();
  });
  
app.use(express.static('uploads'))

//set template engine
// app.use(expressLayouts)
app.set("view engine","ejs")


//route prefix
app.use('',require("./routes/routes"))


app.listen(PORT,()=>{
    console.log(`Boss idey listen for http://localhost:${PORT}`)
})