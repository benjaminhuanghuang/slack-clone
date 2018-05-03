
export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', {
        name:  DataTypes.STRING,
        public: DataTypes.BOOLEAN,
    });

    Channel.associate = (models) => {
        Channel.belongsTo(models.Channel,{
            foreignKey: 'teamId'
        });
    };

    return Channel;
}