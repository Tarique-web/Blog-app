const express = require('express');
const body = require("body-parser");
// const knex = require('./mysql');
const mysql  = require("mysql");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const router = express.Router();
// var signup = require('./router/signup');

const app = express();
app.use(body.json())
app.use ( body.urlencoded ({ extended : true }));


// const knex = require("knex")({
// 	client:process.env.client,
// 	connection:{
// 		user:process.env.user,
// 		password:process.env.password,
// 		host:process.env.host,
// 		database:process.env.database,
// 	}
// })


const knex = require('knex')({
  client: 'mysql',
  connection: {
      host: 'localhost',
      user: 'root',
      password: 'tarique',
      database: 'data'
      
  }
})


require("./router/mysql")(knex)

app.use('/',router);
require('./router/signup')(router,knex,jwt);

app.use('/',router);
require('./router/login')(router,knex,jwt);

app.use('/',router);
require('./router/update')(router,knex,jwt);

app.use('/',router);
require('./router/delete')(router,knex,jwt);

app.use('/',router);
require('./router/details')(router,knex,jwt);


app.use('/',router);
require('./router/users')(router,knex,jwt);

app.use('/',router);
require("./router/blog")(router,knex,jwt);

app.use("/",router);
require("./router/blog_update")(router,knex,jwt);

app.use("/",router);
require("./router/blog_delete")(router,knex,jwt);


// var port = 4444;
app.listen(process.env.PORT || 4444, () => {
	console.log('Server is working on port',process.env.PORT || 4444);
});