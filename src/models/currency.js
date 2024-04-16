import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'; 

class Currency extends Model {}

Currency.init({
  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rateToUSD: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Currency',
  tableName: 'currencies'
});

export default Currency;
