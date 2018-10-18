module.exports = function(sequelize, DataTypes){
	const Product = sequelize.define("Product",{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	Product.associate = _associate;
	return Product;
}

function _associate(models) {
	models.Product.belongsTo(models.Category, { foreignKey: 'id_category', targetKey: 'id' });
}
