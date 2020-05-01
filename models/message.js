module.exports = (sequelize, DataTypes) => {

  const Message = sequelize.define('Message', {
    recipientId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 4096],
      }
    }
  }, {
    indexes: []
  });

  Message.associate = (models) => {
    // associations can be defined here
  };

  return Message;
};
