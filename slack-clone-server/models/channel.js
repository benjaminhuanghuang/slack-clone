
export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', {
        name: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
    });

    Channel.associate = (models) => {
        Channel.belongsTo(models.Channel, {
            foreignKey: { name: 'teamId', field: 'team_id' }
        });
    };

    return Channel;
}