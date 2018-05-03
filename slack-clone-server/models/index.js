import Sequelize from 'sequelize';

// database, username, password
const sequelize =  new Sequelize('slack', 'postgres', 'postgres');

const models = {
    user: sequelize.import('./users'),
    channel: sequelize.import('./channel'),
    member: sequelize.import('./member'),
    message: sequelize.import('./message'),
    team: sequelize.import('./team')
}

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default models;