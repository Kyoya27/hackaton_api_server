const ModelIndex = require('../models');
const User = ModelIndex.User;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const nodemailer = require('nodemailer');

const Op = ModelIndex.Sequelize.Op;

const UserController = function(){};

UserController.add = function(mail, firstname, lastname, password, adress){
	return User.create({
		mail: mail,
		firstname: firstname,
		lastname: lastname,
		password: password,
		adress: adress
	});
};

UserController.update = function(id,mail, firstname, lastname, password, adress){
	const options = {}
	if(mail !== undefined){
		options.mail = mail;
	}
	if(firstname !== undefined){
		options.firstname = firstname;
	}
	if(lastname !== undefined){
		options.lastname = lastname;
	}
	if(password !== undefined){
		options.password = password;
	}

	if(adress !== undefined){
		options.adress = adress;
	}
	return User.update(options, {returning: true, where: {id: id}});
}

UserController.delete = function(id){
	return User.destroy({where: {id: id}});
}


UserController.getAll = function(mail, firstname, lastname, password, adress, limit, offset){
	const where = {};
	const options = {};
	if(mail!== undefined){
		where.mail = {
			[Op.like]: `${mail}%`
		}
	}
	if(firstname!== undefined){
		where.firstname = {
			[Op.like]: `${firstname}%`
		}
	}
	if(lastname!== undefined){
		where.lastname = {
			[Op.like]: `${lastname}%`
		}
	}
	if(password!== undefined){
		where.password = {
			[Op.like]: `${password}%`
		}
	}

	if(adress!== undefined){
		where.adress = {
			[Op.like]: `${adress}%`
		}
	}
	options.where = where;
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}
	return User.findAll(options);
}

UserController.getUser = function(id){
	const where = {};
	const options = {};
	if(id !== undefined){
		where.id = {
			[Op.like]: `${id}%`
		}
	}
	options.where = where;
	return User.find(options)
}

UserController.login = function(mail, password) {
  return User.find({
    where: {
      mail: mail,
      password: password
    }
  })
  .then(user => {
    return user;
  })
};

UserController.verifyToken = function(req, res, next) {
	try {
		const stat = fs.statSync('.token');
		const tkn = fs.readFileSync(".token");
		if(typeof tkn !== 'undefined') {
			jwt.verify(tkn.toString(), 'very_secret_key', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          next();
        }
      });
		} else {
			res.sendStatus(403);
		}
	} catch(err) {
		res.sendStatus(403);
	}
}


UserController.checkUserEmail = function(mail) {
  return User.findOne({
    where: {
      mail: mail
    }
  })
}


UserController.verifyEmail = function(mail){

	UserController.checkUserEmail(mail)
  .then((user)=>{

      const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                  user: 'no.reply.please.project@gmail.com',
                  pass: 'dupondToto12'
              }
      });

      var msg = "Bonjour veuillez confirmer votre adresse email en cliquant <a href='http://localhost:8080/user/confirmed?mail="+user.mail+"'> ici </a>  ";

      var html = "<html> <body> <p>  "+msg+" </p> </body> </html>"

      var mailOptions = {
      from : 'no.reply.please.project@gmail.com',
      to: user.mail,
      subject: "Valider l'inscription",
      html : html
      };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

      transporter.close();

    })
    .catch((err)=>{
      console.error(err);
    })

}

UserController.Confirmed = function(mail){
  return UserController.checkUserEmail(mail)
  .then((user)=>{
    user.updateAttributes({
      mail_confirmed: 1
    });
  })
}



module.exports = UserController;
