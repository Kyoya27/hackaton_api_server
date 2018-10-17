module.exports = function(sequelize, DataTypes){
	const Category = sequelize.define("Category",{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	},
		 {
		paranoid: false,
		underscored: true,
		freezeTableName: true,
		timestamps: false
	});
	Category.associate = _associate;
	return Category;
}

function _associate(models) {
	models.Advert.hasMany(models.Product, { foreignKey: 'id_product', targetKey: 'id' });
}
