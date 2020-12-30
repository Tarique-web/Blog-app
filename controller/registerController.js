const knex = require("../config/dbconfig")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    /**
        * Request Validation
        */
    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    if (!req.body.firstName || req.body.firstName == "") {
        return res.status(400).send({
            message: "first_name  can not be empty",
            status: 400
        });
    }
    if (!req.body.lastName || req.body.lastName == "") {
        return res.status(400).send({
            message: "last_name can not be empty",
            status: 400
        });
    }
    if (!req.body.email || req.body.email == "") {
        return res.status(400).send({
            message: "Email can not be empty",
            status: 400
        });
    }
    if (!req.body.mobile || req.body.mobile == "") {
        return res.status(400).send({
            message: "User mobile can not be empty",
            status: 400
        });
    }
    if (!req.body.password || req.body.password == "") {
        return res.status(400).send({
            message: "password can not be empty",
            status: 400
        });
    }

    bcrypt.hash(req.body.password, 3).then((hash) => {

        var user = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "mobile": req.body.mobile,
            "password": hash
        }

        knex
            .select('*').from('userRegister')
            .where({ "email": req.body.email })
            .then((data) => {

                if (data.length == 0) {

                    knex.select('*').from('userRegister')
                        .insert(user)
                        .then(() => {
                            res.status(200).send({
                                message: "Your account is successfully created",
                                name: user.firstName,
                                status: 200
                            })

                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while create users account.",
                                status: 500
                            });
                        })
                } else {
                    res.status(400).send({
                        message: "Your account is already exist",
                        status: 400
                    })
                }
            }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while finding users account.",
                    status: 500
                });
            })

    })



}
exports.updateRegister = (req, res) => {

    if (!req.body || JSON.stringify(req.body) == "{}") {
        console.log({ "registerController": "updateRegister:request body con't be empty" })
        return res.status(400).send({
            message: "Request body can not be empty",
            status: 400
        });
    }
    const cookie = req.headers.cookie.slice(6);
    const token_verify = jwt.verify(cookie, process.env.SECRET_KEY);

    knex.select("*").from("userRegister")
        .where("email", token_verify.email)
        .update({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "mobile": req.body.mobile
        }).then(() => {
            res.status(200).send({
                message: "successfully your account is updated",
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: message.err || "user not found",
                status: 500
            })
        })

}
// User can delete his register account
exports.deleteRegister = (req, res) => {

    const cookie = req.headers.cookie.slice(6);
    const token_verify = jwt.verify(cookie, process.env.SECRET_KEY);

    knex.select("*").from("userRegister")
        .where("email", token_verify.email)
        .del().then(() => {
            res.status(200).send({
                message: "successfully your account is deleted",
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: message.err || "user not found",
                status: 500
            })
        })

}

exports.getProfile = (req, res) => {

    const cookie = req.headers.cookie.slice(6);
    const token_verify = jwt.verify(cookie, process.env.SECRET_KEY);

    knex.select("*").from("userRegister")
        .where("email", token_verify.email).then((data) => {
            res.status(200).send({
                message: data,
                status: 200
            })
        }).catch((err) => {
            res.status(500).send({
                message: message.err || "user not found",
                status: 500
            })
        })

}