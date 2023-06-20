const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.get('/', async(req,res)=>{
    res.send("hello world").status(200);
})

app.listen('80', function(err){
    console.log("Listening on port 80");
})