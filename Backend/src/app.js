const express = require('express');
const cors = require('cors');
const app=express();
//middleware that connect frontend
app.use(cors({origin:process.env.CLIENT_ORIGIN}));
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("ai run");
    res.send("AI-Chat is running");
});

module.exports=app;