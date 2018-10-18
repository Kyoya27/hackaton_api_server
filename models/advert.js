module.exports = function(sequelize, DataTypes){
	const Advert = sequelize.define("Advert",{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		state: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		date_lapsing: {
	      type: DataTypes.DATE,
	      allowNull: false
	    },
	    end_date: {
	      type: DataTypes.DATE,
	      allowNull: false
	    },
	    start_time_slot: {
	      type: DataTypes.TIME,
	      allowNull: false
	    },
	    end_time_slot: {
	      type: DataTypes.TIME,
	      allowNull: false
	    },
	    comment: {
	      type: DataTypes.TEXT,
	      allowNull: false
	    }
	}, {
		paranoid: false,
		underscored: true,
		freezeTableName: true,
		timestamps: false
	});
	Advert.associate = _associate;
	return Advert;
}

// INTERNAL
function _associate(models) {
	models.Advert.belongsTo(models.User, { foreignKey: 'id_user', targetKey: 'id' });
	models.Advert.belongsTo(models.Product, { foreignKey: 'id_product', targetKey: 'id' });
	models.Advert.belongsTo(models.Category, { foreignKey: 'id_category', targetKey: 'id' });
}
