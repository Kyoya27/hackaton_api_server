const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserController = controllers.UserController;
const Admin = controllers.AdminController;

const userRouter = express.Router();
userRouter.use(bodyParser.json());




userRouter.post('/add', function(req, res){

let mail = req.body.mail;
let firstname = req.body.firstname;
let lastname = req.body.lastname;
let password = req.body.password;
let password2 = req.body.password2;
let adress = req.body.adress;

if( mail === undefined || firstname === undefined || lastname === undefined || password === undefined || adress === undefined || password2 === undefined){
  res.status(400).end();
  return;
}

if(password !== password2){
  res.status(400).end();
  return;
}

UserController.checkUserEmail(mail)
.then((user)=>{
  if(!user){

let hash = bcrypt.hashSync(password,10);
UserController.add(mail,firstname,lastname,hash,adress)
  .then((newUser) =>{
    UserController.verifyEmail(newUser.mail);
    res.status(201).json(newUser);
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).end();
  })

    }
    else{
      res.status(409).end();
      return;
    }
  });
  });



userRouter.post('/update', Admin.verifyToken, function(req, res){

  let mail = req.body.mail;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let password = req.body.password;
  let adress = req.body.adress;

  if(mail === undefined || firstname === undefined || lastname === undefined || password === undefined || adress === undefined ){
    res.status(400).end();
    return;
  }


	UserController.update(mail,firstname,lastname,password,adress)
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

userRouter.get('/all', Admin.verifyToken, function(req,res){

	const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
	const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
	UserController.getAll(req.query.mail, req.query.firstname, req.query.lastname, req.query.password, req.query.adress, limit, offset)
	.then((users) => {
		res.json(users);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

userRouter.get('/getUser/:mail', function(req,res){

	let mail = req.params.mail;

	if(mail === undefined){
		res.status(400).end();
		return;
	}

	UserController.checkUserEmail(mail)
	.then((user) => {
		res.json(user);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

userRouter.post('/login/:mail/:password', function(req, res) {
  const mail = req.params.mail;
  const password = req.params.password;


  if(mail === undefined && password === undefined) {
    res.status(400).end();
    return;
  }

  UserController.checkUserEmail(mail)
  .then((user)=>{
    if(user){


      if(bcrypt.compareSync(password,user.password)){

        if(res){
          if(user.mail_confirmed === 1){
            var token = jwt.sign({user}, "very_secret_key");
            fs.writeFile(".token", token, function(err) {
              if(err) {
                throw err;
              }
            });
            var fullUser = {
              id: user.id,
              mail: user.mail,
              firstname: user.firstname,
              lastname: user.lastname,
              password: user.password,
              adress: user.adress,
              mail_confirmed: user.mail_confirmed,
              token: token
            }
            res.status(201).json(fullUser);

          }
        }
      }
    }else{

      res.status(404).end();
      return;
    }
  })

});

userRouter.post('/logout', function(req, res) {
  try {
    fs.statSync('.token');
    fs.unlink('.token', (err) => {
      if (err) {
        res.status(500).end();
        throw err;
      }
    });
    res.status(201).end();
  } catch(err) {
    res.sendStatus(500).end();
  }
});

userRouter.get('/confirmed' , function(req,res){
  const mail = req.query.mail;
  if(mail === undefined ) {
    res.status(400).end();
    return;
  }

  UserController.Confirmed(mail);
  res.status(200).end();
  return;
});

userRouter.put('/resetPassword' , function(req,res){
  const mail = req.body.mail;
  const pw1 = req.body.pw1;
  const pw2 = req.body.pw2;

  if(mail === undefined || pw1 === undefined || pw2 === undefined) {
    res.status(400).end();
    return;
  }
  UserController.checkUserEmail(mail)
  .then((user)=>{
    if(pw1 === pw2){
      let hash = bcrypt.hashSync(pw1,10);
      UserController.update('','','',hash);
    }
  })
  res.status(200).end();
  return;
});



module.exports = userRouter;
