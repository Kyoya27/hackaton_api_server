module.exports = function(sequelize, DataTypes){
	const Category = sequelize.define("Category",{
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
