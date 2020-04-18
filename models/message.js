module.exports = (sequelize, DataTypes) => {

  const Message = sequelize.define('Message', {
    recipient_id: DataTypes.STRING,
    sender_id: DataTypes.STRING,
    text: DataTypes.STRING
  }, {});

  Message.associate = (models) => {
    // associations can be defined here
  };

  return Message;
};
