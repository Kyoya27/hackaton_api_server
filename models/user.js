module.exports = function(sequelize, DataTypes){
	const User = sequelize.define("User",{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		mail: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		adress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		mail_confirmed: {
			type: DataTypes.INTEGER,
			allowNull: false,
      		defaultValue: 0
		}
	}, {
		paranoid: false,
		underscored: true,
		freezeTableName: true,
		timestamps: false
	});
	return User;
}
