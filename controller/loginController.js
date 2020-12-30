const knex = require("../config/dbconfig")
const jwt = require("jsonwebtoken"); // jsonwebtoken module for create token
const bcrypt = require("bcryptjs");
console.log(process.env.SECRET_KEY);
exports.login = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }

    if (
        (!req.body.email || req.body.email == "") &&
        (!req.body.mobile || req.body.mobile == "")
    ) {
        return res.status(400).send({
            message: "mobile or email can not be empty",
            status: 400
        });
    }

    if (!req.body.password || req.body.password == "") {
        return res.status(400).send({
            message: "password can not be empty",
            status: 400
        });
    }

    knex.select('*')
        .from('userRegister')
        .where("email",req.body.email)
        .then((data) => {
            if (data.length > 0) {
                
                bcrypt.compare(req.body.password, data[0].password, (err, isMatch) => {
                   
                   if (!isMatch) {

                        res.status(400).send({
                            message: "Password is not correct!",
                            status: 500
                        })
                    } else {

                        console.log({ "Login successfull!": data[0].first_name });

                        let token = jwt.sign({ "id": data[0].id, "first-name": data[0].first_name, "email": data[0].email, "Mobile_no": data[0].Mobile_no }, process.env.SECRET_KEY, {
                            expiresIn: "7 days",
                        }); // create token here and it will expire in 7 days

                        res.cookie("token", token); // use cookie, token will be save in cookie in user browser
                        res.setHeader("content-type", "application/json");
                        res.send({
                            status: 200,
                            name: data[0].first_name,
                            message: "login successfully",
                            token: token,
                        })

                    }

                })


            } else {
                res.send({
                    message: "This user doesn't exists! please register it.....",
                    status: 200
                })

            }
        }).catch((err) => {
            res.status(500).send({
                message: "user not found",
                status: 500
            })

        })


}