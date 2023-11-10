require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');



const app = express()
const PORT = process.env.PORT || 4000

//db connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error",(error) => console.log(error));
db.once("open",() => console.log('Connected to database'));


app.get('/',(req,res)=>{
    res.send("Yeah")
})


app.listen(PORT,()=>{
    console.log("Boss idey listen")
})