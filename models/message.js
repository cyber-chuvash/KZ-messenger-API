module.exports = (sequelize, DataTypes) => {

  const Message = sequelize.define('Message', {
    recipient_id: DataTypes.STRING,   // TODO use int
    sender_id: DataTypes.STRING,
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
