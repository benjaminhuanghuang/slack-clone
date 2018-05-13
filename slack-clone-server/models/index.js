import Sequelize from 'sequelize';

// database, username, password
const sequelize = new Sequelize('myslack', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,   // ignore depreciation warning
  define:{
    underscored: true    // conver camel case columns to snake case
  } 
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Member: sequelize.import('./member'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team')
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;