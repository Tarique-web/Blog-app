// module.exports = (router, knex) => {

// 	router
// 		.get('/', (req, res) => {
// 			res.send("welcome to page");
// 			console.log("welcom to my page");
// 		})




// 		.post('/author', function (req, res) {
// 			var email = req.body.email;
// 			var password = req.body.password;

// 			knex.select('*').from('users').where('email',email)
// 			.then((result)=>{
// 				if(result.length>0){
// 					if (password== result[0].password){
// 						res.send('successfull login')
// 					}else{
// 						res.send("email and password does not match")
// 					}
// 				}
// 				else{
// 					res.send("email doesn't exist")

// 				}

// 		});
// 	})


// };	
// -------------------------------------------------------------------------------------------------------------

module.exports = (router, knex, jwt) => {
	router


		.get('/', (req, res) => {
			res.send("welcome to page");
			console.log("welcom to my page");
		})

		.post('/login', (req, res) => {
			knex.select('*')
				.from('users')
				.where('email', req.body.email)
				.then((results) => {
					if (results.length > 0) {

						if (results[0].password === req.body.password) {
							var token = jwt.sign({ "id": results[0].id, "first_name": results[0].first_name, "last_name": results[0].last_name, "email": results[0].email, "Mobile_no": results[0].Mobile_no, "password": results[0].password },"tarique", { expiresIn : "12h"})
							res.cookie("key", token);
							console.log({ "Login successfull!": results, token });
							res.send({ "You Login successfully!": results});

						}else {
							res.send({"Error": "Password is invalid"})
						}
								

					}else {
						res.send({"Error": "This user doesn't exists! please Signup....."})
				
					}
				}).catch((err) => {
								res.send(err)
							})
		
				})
}