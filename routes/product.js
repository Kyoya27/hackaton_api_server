const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const ProductController = controllers.ProductController;
const Admin = controllers.AdminController;

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.post('/add', Admin.verifyToken, function(req, res){
	let name = req.body.name;
	let price = req.body.price;
	let highlight = req.body.priority;
	let category = req.body.category;
	let available = req.body.available;
	let id_promotion = req.body.id_promotion;
	if(name === undefined || price === undefined ||category === undefined){
		res.status(400).end();
		return;
	}
	if(highlight === undefined){
		highlight = 0;
	}
	if(available === undefined){
		available = 0;
	}
	if(id_promotion === undefined || id_promotion === 0 || id_promotion === ""){
		id_promotion = null;
	}
	ProductController.add(name, price, highlight, category, available, id_promotion)
	.then((product) =>{
		res.status(201).json(product);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

productRouter.post('/update', Admin.verifyToken, function(req, res){
	if(req.body.id === undefined){
		res.status(400).end();
		return;
	}
	ProductController.update(req.body.id, req.body.name, req.body.price, req.body.highlight, req.body.category, req.body.available, req.body.id_promotion)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});


productRouter.post('/delete', Admin.verifyToken, function(req, res){
	if(req.body.id === undefined){
		res.status(400).end();
		return;
	}
	ProductController.delete(req.body.id)
	res.status(204).end();
});

productRouter.get('/', function(req,res){
	const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
	const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
	ProductController.getAll(req.query.name, req.query.price, req.query.priority, req.query.category, req.query.available, req.query.id_promotion, limit, offset)
	.then((products) => {
		res.json(products);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

productRouter.get('/getProduct', function(req,res){
	if( req.query.id === undefined){
		res.status(400).end();
		return;
	}
	ProductController.getProduct(req.query.id)
	.then((product) => {
		res.json(product);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
})

module.exports = productRouter;