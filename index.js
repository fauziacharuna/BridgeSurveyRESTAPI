const express = require('express');
const app = express();
const mongodb = require('mongodb');

const config = require('./db');
const PORT = 4000;
const client = mongodb.MongoClient;

client.connect(config.DB, function(err,db){
    if(err){
        console.log("database not connected");
    }else{
        console.log("database connected");
    }
});

app.get('/',function(req,res){
    res.json({"hello":"World"})
});
app.listen(PORT,function(){
    console.log("your node js server is running on "+PORT);
});

