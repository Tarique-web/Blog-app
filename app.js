const express = require('express');
const body = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
var db = require("./config/dbconfig");

const router = express.Router();

const app = express();
app.use(body.json())
app.use ( body.urlencoded ({ extended : true }));


app.use("/", router);

// base URLs
app.use("/register", require("./routes/registerRout"));
app.use("/login",require("./routes/loginRout"))
app.use('/blog',require('./routes/blogRout'));


// var port = 4444;
app.listen(process.env.PORT || 4444, () => {
	console.log('Server is working on port',process.env.PORT || 4444);
});