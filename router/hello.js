const express = require("express");
// const mysql = require('mysql');

const app = express();
var knex = require('knex')({
  client: 'mysql',
  connection: {
      host: 'localhost',
      user: 'root',
      password: 'vishal1234',
      database: 'hello'
  }
})
app.post("/add",(req,res)=>{
    var name = req.body.name
    console.log(name);
 
knex("hi").insert(name).then((results) => {
    res.send(results)

    })
})

// app.get("/data",(req,res)=>{
//     res.send
// })
app.listen(4444,()=>{
    console.log("server is working")
})

