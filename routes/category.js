const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const CategoryController = controllers.CategoryController;
const Admin = controllers.AdminController;

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.post('/add/:name', Admin.verifyToken, function(req, res){
	let name = req.params.name;

	if(name === undefined) {
		res.status(400).end();
		return;
	}

	CategoryController.add(name)
	.then((category) =>{
		res.status(201).json(category);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

categoryRouter.post('/update/:name', Admin.verifyToken, function(req, res){
	let name = req.body.name;
	if(name === undefined){
		res.status(400).end();
		return;
	}
	CategoryController.update(name)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});


categoryRouter.post('/delete/:id', Admin.verifyToken, function(req, res){

	let id = req.body.id;
	if(id === undefined){
		res.status(400).end();
		return;
	}
	CategoryController.delete(id)
	res.status(204).end();
});

categoryRouter.get('/all/:name', Admin.verifyToken, function(req,res){
	let name = req.body.name;
	const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
	const offset = req.query.offset ? parseInt(req.query.offset) : undefined;

	if(name === undefined){
		res.status(400).end();
		return;
	}

	CategoryController.getAll(name, limit, offset)
	.then((categorys) => {
		res.json(categorys);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

categoryRouter.get('/getCategory/:id', Admin.verifyToken ,function(req,res){
	let id = req.params.id;
	if(id === undefined){
		res.status(400).end();
		return;
	}
	CategoryController.getCategory(id)
	.then((category) => {
		res.json(category);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
})

module.exports = categoryRouter;
