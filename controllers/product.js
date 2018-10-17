const ModelIndex = require('../models');
const Product = ModelIndex.Product;
const Op = ModelIndex.Sequelize.Op;

const ProductController = function(){};

ProductController.add = function(name, price, highlight, category, available, id_promotion){
	return Product.create({
		name: name,
		price: price,
		highlight: highlight,
		category: category,
		available: available,
		id_promotion: id_promotion
	});
};

ProductController.update = function(id, name, price, highlight, category, available, id_promotion){
	const options = {}
	if(name !== undefined){
		options.name = name;
	}
	if(price !== undefined){
		options.price = price;
	}
	if(highlight !== undefined){
		options.highlight = highlight;
	}
	if(category !== undefined){
		options.category = category;
	}
	if(available !== undefined){
		options.available = available;
	}
	if(id_promotion !== undefined){
		options.id_promotion = id_promotion;
	}
	return Product.update(options, {returning: true, where: {id: id}});
}

ProductController.delete = function(id){
	return Product.destroy({where: {id: id}});
}


ProductController.getAll = function(name, price, priority, category, available, id_promotion, limit, offset){
	const where = {};
	const options = {};
	if(name!== undefined){
		where.name = {
			[Op.like]: `${name}%`
		}
	}
	if(price!== undefined){
		where.price = {
			[Op.like]: `${price}%`
		}
	}
	if(priority!== undefined){
		where.highlight = {
			[Op.like]: `${priority}%`
		}
	}
	if(category!== undefined){
		where.category = {
			[Op.like]: `${category}%`
		}
	}
	if(available!== undefined){
		where.available = {
			[Op.like]: `${available}%`
		}
	}
	if(id_promotion!== undefined){
		where.id_promotion = {
			[Op.like]: `${id_promotion}%`
		}
	}
	options.where = where;
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}
	return Product.findAll(options);
}

ProductController.getProduct = function(id){
	const where = {};
	const options = {};
	if(id !== undefined){
		where.id = {
			[Op.like]: `${id}%`
		}
	}
	options.where = where;
	return Product.find(options)
}

module.exports = ProductController;