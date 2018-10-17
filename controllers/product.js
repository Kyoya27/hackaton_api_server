const ModelIndex = require('../models');
const Product = ModelIndex.Product;
const Op = ModelIndex.Sequelize.Op;

const ProductController = function(){};

ProductController.add = function(name, id_category){
	return Product.create({
		name: name,
		id_category: id_category
	});
};

ProductController.update = function(name, id_category){
	const options = {}
	if(name !== undefined){
		options.name = name;
	}
	if(id_category !== undefined){
		options.id_category = id_category;
	}
	return Product.update(options, {returning: true, where: {id: id}});
}

ProductController.delete = function(id){
	return Product.destroy({where: {id: id}});
}


ProductController.getAll = function(name, id_category, limit, offset){
	const where = {};
	const options = {};
	if(name!== undefined){
		where.name = {
			[Op.like]: `${name}%`
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