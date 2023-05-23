
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

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
})

app.get("/users",(req,res)=>{
    res.json(users);
})
 
const port = 6000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});