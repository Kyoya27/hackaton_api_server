const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const AdvertController = controllers.AdvertController;
const Admin = controllers.AdminController;

const advertRouter = express.Router();
advertRouter.use(bodyParser.json());

advertRouter.post('/add/:name/:quantity/:state/:date_lapsing/:end_date/:start_time_slot/:end_time_slot/:comment', Admin.verifyToken, function(req, res){

let name = req.params.name;
let quantity = req.params.quantity;
let state = req.params.state;
let date_lapsing = req.params.date_lapsing;
let end_date = req.params.end_date;
let start_time_slot = req.params.start_time_slot;
let end_time_slot = req.params.end_time_slot;
let comment = req.params.comment;


if(name === undefined || quantity === undefined || state === undefined || date_lapsing === undefined || end_date === undefined || start_time_slot === undefined || end_time_slot === undefined || comment === undefined ){
  res.status(400).end();
  return;
}
AdvertController.add(name, quantity, state, date_lapsing, end_date, start_time_slot, end_time_slot, comment)
	.then((advert) =>{
		res.status(201).json(advert);
	})
	.catch((err) =>{
		res.status(500).end();
	})
});

advertRouter.post('/update/:id/:name/:quantity/:state/:date_lapsing/:end_date/:start_time_slot/:end_time_slot/:comment', Admin.verifyToken, function(req, res){

	let id = req.params.id;
  let name = req.params.name;
  let quantity = req.params.quantity;
  let state = req.params.state;
  let date_lapsing = req.params.date_lapsing;
  let end_date = req.params.end_date;
  let start_time_slot = req.params.start_time_slot;
  let end_time_slot = req.params.end_time_slot;
  let comment = req.params.comment;

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

advertRouter.get('/all/:name/:quantity/:state/:date_lapsing/:end_date/:start_time_slot/:end_time_slot/:comment', function(req,res){

  let name = req.params.name;
  let quantity = req.params.quantity;
  let state = req.params.state;
  let date_lapsing = req.params.date_lapsing;
  let end_date = req.params.end_date;
  let start_time_slot = req.params.start_time_slot;
  let end_time_slot = req.params.end_time_slot;
  let comment = req.params.comment;

  if(name === undefined || quantity === undefined || state === undefined || date_lapsing === undefined || end_date === undefined || start_time_slot === undefined || end_time_slot === undefined || comment === undefined ){
    res.status(400).end();
    return;
  }


	const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
	const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
	AdvertController.getAll(name, quantity, state, date_lapsing, end_date, start_time_slot, end_time_slot, comment, limit, offset)
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
