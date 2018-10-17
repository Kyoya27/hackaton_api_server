module.exports = function(sequelize, DataTypes){
	const Admin = sequelize.define("Admin",{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    login: {
			type: DataTypes.STRING,
      allowNull: false
		},
    password: {
			type: DataTypes.STRING,
      allowNull: false
		}
	}, {
		underscored: true,
		timestamps: false,
		freezeTableName: true
	});
  
	return Admin;
}