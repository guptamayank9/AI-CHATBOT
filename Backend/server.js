const express = require('express');
const app = express();


const PORT=4000;

app.use(express.json());

app.get('/',(req,res)=>{
        console.log("APi working fine");
    res.send("Api work fineeeine");
});


app.listen(PORT,()=>{
    console.log("Server Running at PORT:",PORT);
})