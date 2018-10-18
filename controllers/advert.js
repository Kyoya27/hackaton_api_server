const ModelIndex = require('../models');
const Advert = ModelIndex.Advert;
const Op = ModelIndex.Sequelize.Op;

const AdvertController = function(){};

AdvertController.add = function(name, quantity, state, date_lapsing, end_date, start_time_slot, end_time_slot, comment,id_user,id_product, id_category){
	return Advert.create({
		name: name,
		quantity: quantity,
		state: state,
		date_lapsing: date_lapsing,
		end_date: end_date,
		start_time_slot: start_time_slot,
		end_time_slot: end_time_slot,
		comment: comment,
		id_user: id_user,
		id_product: id_product,
		id_category: id_category
	});
};

AdvertController.update = function(id,name, quantity, state, date_lapsing, end_date, start_time_slot, end_time_slot, comment,id_user,id_product, id_category){
	const options = {}
	if(name !== undefined){
		options.name = name;
	}
	if(quantity !== undefined){
		options.quantity = quantity;
	}
	if(state !== undefined){
		options.state = state;
	}
	if(date_lapsing !== undefined){
		options.date_lapsing = date_lapsing;
	}
	if(end_date !== undefined){
		options.end_date = end_date;
	}
	if(start_time_slot !== undefined){
		options.start_time_slot = start_time_slot;
	}
	if(end_time_slot !== undefined){
		options.end_time_slot = end_time_slot;
	}
	if(comment !== undefined){
		options.comment = comment;
	}
	if(id_user !== undefined){
		options.id_user = id_user;
	}
	if(id_product !== undefined){
		options.id_product = id_product;
	}
	if(id_category !== undefined){
		options.id_category = id_category;
	}
	return Advert.update(options, {returning: true, where: {id: id}});
}

AdvertController.delete = function(id){
	return Advert.destroy({where: {id: id}});
}


AdvertController.getAll = function(name, quantity, state, date_lapsing, end_date, start_time_slot, end_time_slot, comment,id_user,id_product, id_category, limit, offset){
	const where = {};
	const options = {};
	if(name!== undefined){
		where.name = {
			[Op.like]: `${name}%`
		}
	}
	if(quantity!== undefined){
		where.quantity = {
			[Op.like]: `${quantity}%`
		}
	}
	if(state!== undefined){
		where.state = {
			[Op.like]: `${state}%`
		}
	}
	if(date_lapsing!== undefined){
		where.date_lapsing = {
			[Op.like]: `${date_lapsing}%`
		}
	}
	if(end_date!== undefined){
		where.end_date = {
			[Op.like]: `${end_date}%`
		}
	}
	if(start_time_slot!== undefined){
		where.start_time_slot = {
			[Op.like]: `${start_time_slot}%`
		}
	}
	if(end_time_slot!== undefined){
		where.end_time_slot = {
			[Op.like]: `${end_time_slot}%`
		}
	}
	if(comment!== undefined){
		where.comment = {
			[Op.like]: `${comment}%`
		}
	}
	if(id_user!== undefined){
		where.id_user = {
			[Op.like]: `${id_user}%`
		}
	}
	if(id_product!== undefined){
		where.id_product = {
			[Op.like]: `${id_product}%`
		}
	}
	if(id_category!== undefined){
		where.id_category = {
			[Op.like]: `${id_category}%`
		}
	}
	options.where = where;
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}
	return Advert.findAll(options);
}

AdvertController.getAdvert = function(id){
	const where = {};
	const options = {};
	if(id !== undefined){
		where.id = {
			[Op.like]: `${id}%`
		}
	}
	options.where = where;
	return Advert.find(options)
}

module.exports = AdvertController;
