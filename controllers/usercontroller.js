const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req,res,next)=>{
	bcrypt.hash(req.body.password,10,function(err,hashedpass) {
		if(err){
			res.json({
				error:err
			})
		}

	let user = new User({
		name: req.body.name,
		email: req.body.email,
		phone:req.body.phone,
		password: hashedpass
	})
	user.save()
	.then(user =>{
		// res.json({
		// 	message:'User Added',
		// })
		res.redirect("/login");
	})
	.catch(error => {
		res.json({
			message:'err '
		})
	})

	})

}

const login = (req,res,next)=>{
	let username = req.body.username
	let password = req.body.password

	User.findOne({$or: [{email:username},{name:username}]})
	.then(user => {
		if(user){
			bcrypt.compare(password,user.password,function(err,result){
				if (err) {
					res.json({
						error:err
					})
				}
				if (result) {
					let token=jwt.sign({name:user.name},'verSEcretValue',{})
					res.redirect("/profile");
					console.log(user.name,token)
					// res.json({
					// 	message:"login done",
					// 	token
					// })
				}else {
					res.json({
						message:'pass dont'
					})
				}
			})
		}else{
			res.json({
				message:"no user"
			})
		}
	})
}



module.exports = { 
	register,
	login
}