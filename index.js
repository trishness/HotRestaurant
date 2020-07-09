const express = require ("express");
const app = express();

const PORT = 3000;

app.get ("/", (req,res)=>{
    res.sendStatus("Working");
})

app.listen(PORT, function(){
    console.log("listening on Port: " +PORT)
})