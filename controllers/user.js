const ModelIndex = require('../models');
const User = ModelIndex.User;
const Op = ModelIndex.Sequelize.Op;

const UserController = function(){};

UserController.add = function(mail, firstname, lastname, password, password2, adress){
	return User.create({
		mail: mail,
		firstname: firstname,
		lastname: lastname,
		password: password,
		password2: password2,
		adress: adress
	});
};

UserController.update = function(id,mail, firstname, lastname, password, password2, adress){
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
	if(password2 !== undefined){
		options.password2 = password2;
	}
	if(adress !== undefined){
		options.adress = adress;
	}
	return User.update(options, {returning: true, where: {id: id}});
}

UserController.delete = function(id){
	return User.destroy({where: {id: id}});
}


UserController.getAll = function(mail, firstname, lastname, password, password2, adress, limit, offset){
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
	if(password2!== undefined){
		where.password2 = {
			[Op.like]: `${password2}%`
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

module.exports = UserController;
