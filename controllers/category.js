const ModelIndex = require('../models');
const Category = ModelIndex.Category;
const Op = ModelIndex.Sequelize.Op;

const CategoryController = function(){};

CategoryController.add = function(name){
	return Category.create({
		name: name
	});
};

CategoryController.update = function(name){
	const options = {}
	if(name !== undefined){
		options.name = name;
	}
	return Category.update(options, {returning: true, where: {id: id}});
}

CategoryController.delete = function(id){
	return Category.destroy({where: {id: id}});
}


CategoryController.getAll = function(limit, offset){
	const where = {};
	const options = {};

	options.where = where;
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}
	return Category.findAll(options);
}

CategoryController.getCategory = function(id){
	const where = {};
	const options = {};
	if(id !== undefined){
		where.id = {
			[Op.like]: `${id}%`
		}
	}
	options.where = where;
	return Category.find(options)
}



module.exports = CategoryController;
