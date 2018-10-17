const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const ProductController = controllers.ProductController;
const Admin = controllers.AdminController;

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.post('/add/:name/:id_category', Admin.verifyToken, function(req, res){
let name = req.params.name;
let id_category = req.params.id_category;

if(name === undefined || id_category === undefined){
	res.status(400).end();
	return;
}
	ProductController.add(name,id_category)
	.then((product) =>{
		res.status(201).json(product);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

productRouter.post('/update/:id/:name/:id_category', Admin.verifyToken, function(req, res){

	let id = req.params.id;
	let id_category = req.params.id_category;

	if( name === undefined || id_category === undefined){
		res.status(400).end();
		return;
	}

	ProductController.update(name, id_category)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});


productRouter.post('/delete/:id', Admin.verifyToken, function(req, res){

 let id = req.params.id;
	if(id === undefined){
		res.status(400).end();
		return;
	}
	ProductController.delete(id)
	res.status(204).end();
});

productRouter.get('/all/:name/:id_category', function(req,res){

let name = req.params.name;
let id_category = req.params.id_category;
	if( name === undefined || id_category === undefined){
		res.status(400).end();
		return;
	}

	const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
	const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
	ProductController.getAll(name,id_category, limit, offset)
	.then((products) => {
		res.json(products);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

productRouter.get('/getProduct/:id', function(req,res){

	let id = req.params.id;

	if(id === undefined){
		res.status(400).end();
		return;
	}

	ProductController.getProduct(id)
	.then((product) => {
		res.json(product);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
})

module.exports = productRouter;
