const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UserController = controllers.UserController;
const Admin = controllers.AdminController;

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post('/add/:firstname/:lastname/:mail/:password/:password2/:adress', Admin.verifyToken, function(req, res){

let mail = req.params.mail;
let firstname = req.params.mail;
let lastname = req.params.mail;
let password = req.params.mail;
let password2 = req.params.mail;
let adress = req.params.mail;

if(mail === undefined || mail === undefined || firstname === undefined || lastname === undefined || password === undefined || adress === undefined ){
  res.status(400).end();
  return;
}
UserController.add(mail,firstname,lastname,password,password2,adress)
	.then((user) =>{
		res.status(201).json(user);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

userRouter.post('/update/:id/:firstname/:lastname/:mail/:password/:password2/:adress', Admin.verifyToken, function(req, res){

	let id = req.params.id;
  let mail = req.params.mail;
  let firstname = req.params.mail;
  let lastname = req.params.mail;
  let password = req.params.mail;
  let password2 = req.params.mail;
  let adress = req.params.mail;

  if(id === undefined || mail === undefined || mail === undefined || firstname === undefined || lastname === undefined || password === undefined || adress === undefined ){
    res.status(400).end();
    return;
  }


	UserController.update(id,mail,firstname,lastname,password,password2,adress)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});


userRouter.post('/delete/:id', Admin.verifyToken, function(req, res){

 let id = req.params.id;
	if(id === undefined){
		res.status(400).end();
		return;
	}
	UserController.delete(id)
	res.status(204).end();
});

userRouter.get('/all/:firstname/:lastname/:mail/:password/:password2/:adress', function(req,res){

  let mail = req.params.mail;
  let firstname = req.params.mail;
  let lastname = req.params.mail;
  let password = req.params.mail;
  let password2 = req.params.mail;
  let adress = req.params.mail;

  if(id === undefined || mail === undefined || mail === undefined || firstname === undefined || lastname === undefined || password === undefined || adress === undefined ){
    res.status(400).end();
    return;
  }

	const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
	const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
	UserController.getAll(mail, firstname, lastname, password, password2, adress, limit, offset)
	.then((users) => {
		res.json(users);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

userRouter.get('/getUser/:id', function(req,res){

	let id = req.params.id;

	if(id === undefined){
		res.status(400).end();
		return;
	}

	UserController.getUser(id)
	.then((user) => {
		res.json(user);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
})

module.exports = userRouter;
