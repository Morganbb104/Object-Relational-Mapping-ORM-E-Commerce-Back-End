const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {} Tag.init({ // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement

    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: 'id'
        }
    },
    tage_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Tag',
            key: 'id'
        }
    }

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag'
});

module.exports = Tag;
