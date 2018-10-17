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
	return Product;
}

function _associate(models) {
	models.Advert.belongsTo(models.User, { foreignKey: 'id_user', targetKey: 'id' });
	models.Product.belongsTo(models.Advert, { foreignKey: 'id_advert', targetKey: 'id' });
}
