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
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		highlight: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		category: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		available: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_promotion: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
	Product.associate = _associate;
	return Product;
}

function _associate(models){
		models.Product.belongsTo(models.Promotion, { foreignKey: 'id_promotion', targetKey: 'id' });
}