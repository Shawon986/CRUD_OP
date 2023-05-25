require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.use(bodyParser.json());
const uri= process.env.MONGODB_URI;
mongoose.connect(uri,{useNewUrlParser :true})
  .then(() => console.log('Connected!'));

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open  ' );
  }); 
  
  // If the connection throws an error
mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' );
  }); 

//! Api to check connection

app.get("/", (req,res)=>{
    res.json({Message:"Welcome to my app"});
});

let users =[];
let lastId = 0;

//! Api to create user

app.post("/users", (req,res)=>{
    const user =req.body;
    user.id = ++lastId;
    users.push(user);
    res.status(201).json(user);

});

app.get("/users/:id",(req,res)=>{
    const id= req.params.id;
    const user= users.find((u)=>u.id==id)

    if(user){
        res.json(user);
    }else{
        res.status(404).json({Message:"User not found"});
    }
    
});

app.put("/users/:id",(req,res)=>{
    const id= req.params.id;
    const body = req.body;
    const user= users.find((u)=>u.id==id);
    if(user){
        user.fname =body.fname;
        user.lname =body.lname;
        res.json(user)

    }else{
        res.status(404).json({Message:"User not found"});

    }
});

app.delete("/users/:id",(req,res)=>{
    const id= req.params.id;                                           
    const userIndex= users.findIndex((u)=>u.id==id);
    if(userIndex){
        users.splice(userIndex,1);
        res.json(users)
    }else{
        res.status(404).json({Message:"User not found"});

    }
})

app.get("/users",(req,res)=>{
    res.json(users);
})
 
const port = process.env.PORT; 
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});  