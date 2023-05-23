
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//! Api to check connection

app.get("/", (req,res)=>{
    res.json({Message:"Welcome to my app"});
});

let users =[]

//! Api to create user

app.post("/users", (req,res)=>{
    const user =req.body;
    users.push(user);
    res.status(201).json(user);

});

app.get("/users",(req,res)=>{
    res.json(users);
})
 
const port = 6000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});