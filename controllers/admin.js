const ModelIndex = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Admin = ModelIndex.Admin;
const Op = ModelIndex.Sequelize.Op;

const AdminController = function(){};

AdminController.login = function(login, password) {
  return Admin.find({
    where: {
      login: login,
      password: password
    }
  })
  .then(adm => {
    return adm;
  })
};

AdminController.verifyToken = function(req, res, next) {
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

module.exports = AdminController;