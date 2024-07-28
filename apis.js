const {Messaging}=require('./schema')
const express = require('express')
const app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
var http = require('http').Server(app)
var io = require('socket.io')(http);
var socket = io;
app.use(bodyParser.urlencoded({extended: false}))

app.post('/message',async(req,res)=>{
    const msg=new Messaging({
        name:req.body.name,
        message:req.body.message
    })
    const data=await Messaging.findOne({name:req.body.name});
    if(data){
        return res.status(200).json({
            success:false,
            message:"failed"
           }) 
    }
    try{
        io.emit('message',req.body.message)
        msg.save();
        return res.status(200).json({
        success:true,
        message:"Success",
        data
       })
    }
    catch (error){
    return res.status(201).json({
        success : false,
        message : "Unable to SignUp please try again later",error
        });
    }
    finally{
        console.log('Message Posted')
    }
})

app.get('/message/get',async(req,res)=>{
    const data=await Messaging.find({});
    if(!data){
        return res.status(200).json({
            success:false,
            message:"failed"
           }) 
    }
    try{
        return res.status(200).json({
        success:true,
        message:"Success",
        data
       })
    }
    catch (error){
    return res.status(201).json({
        success : false,
        message : "Unable to SignUp please try again later",error
        });
      }
})

app.get('/message/name',async(req,res)=>{
    
    const data=await Messaging.find({name:req.body.name});
    if(!data){
        return res.status(200).json({
            success:false,
            message:"failed"
           }) 
    }
    
        return res.status(200).json({
        success:true,
        message:"Success",
        data
       })
})



io.on('connection', () =>{
    console.log('a user is connected')
  })


socket.on('message', Messaging)

module.exports=app;