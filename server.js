const express = require('express')
const app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
require('dotenv').config()
const port = process.env.PORT || 5000

// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

require("dotenv").config();
//Database connection
mongoose.connect('mongodb://0.0.0.0:27017/message', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})


app.listen(port , ()=> console.log(`app listening at http://0.0.0.0:${port}`))


const m=require('./apis')

app.use(m);

module.exports=app;