const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const AdvertController = controllers.AdvertController;
const Admin = controllers.AdminController;

const ProductController = controllers.ProductController;

const advertRouter = express.Router();
advertRouter.use(bodyParser.json());

advertRouter.post('/add', Admin.verifyToken, function(req, res){

let name = req.body.name;
let quantity = req.body.quantity;
let state = req.body.state;
let date_lapsing = req.body.date_lapsing;
let end_date = req.body.end_date;
let start_time_slot = req.body.start_time_slot;
let end_time_slot = req.body.end_time_slot;
let comment = req.body.comment;
let id_product = req.body.id_product;
let id_user = req.body.id_user;
    let id_category = req.body.id_category;

console.log(name);
console.log(quantity);
console.log(state);
    console.log(date_lapsing);
    console.log(end_date);
    console.log(end_time_slot);
    console.log(start_time_slot);
    console.log(comment);
    console.log(id_category);

if(name === undefined || quantity === undefined || state === undefined || date_lapsing === undefined || end_date === undefined || start_time_slot === undefined || end_time_slot === undefined || comment === undefined ){
  res.status(400).end();
  return;
}
AdvertController.add(name, quantity, state, date_lapsing, end_date, start_time_slot, end_time_slot, comment, id_user, id_product, id_category)
	.then((advert) =>{
		res.status(201).json(advert);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

advertRouter.post('/update', Admin.verifyToken, function(req, res){

	let id = req.body.id;
  let name = req.body.name;
  let quantity = req.body.quantity;
  let state = req.body.state;
  let date_lapsing = req.body.date_lapsing;
  let end_date = req.body.end_date;
  let start_time_slot = req.body.start_time_slot;
  let end_time_slot = req.body.end_time_slot;
  let comment = req.body.comment;

  if(id ===undefined || name === undefined || quantity === undefined || state === undefined || date_lapsing === undefined || end_date === undefined || start_time_slot === undefined || end_time_slot === undefined || comment === undefined ){
    res.status(400).end();
    return;
  }

	AdvertController.update(id,name, quantity, state, date_lapsing, end_date, start_time_slot, end_time_slot, comment)
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
	res.status(204).end();
});


advertRouter.post('/delete/:id', Admin.verifyToken, function(req, res){

 let id = req.params.id;
	if(id === undefined){
		res.status(400).end();
		return;
	}
	AdvertController.delete(id)
	res.status(204).end();
});

advertRouter.get('/all', function(req,res){

	const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
	const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
	AdvertController.getAll(req.query.name, req.query.quantity, req.query.state, req.query.date_lapsing, req.query.end_date, req.query.start_time_slot, req.query.end_time_slot, req.query.comment, req.query.id_user, req.query.id_product, req.query.id_category, limit, offset)
	.then((adverts) => {
		res.json(adverts);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
});

advertRouter.get('/getAdvert/:id', function(req,res){

	let id = req.params.id;

	if(id === undefined){
		res.status(400).end();
		return;
	}

	AdvertController.getAdvert(id)
	.then((advert) => {
		res.json(advert);
	})
	.catch((err) =>{
		console.log(err);
		res.status(500).end();
	})
})

module.exports = advertRouter;
