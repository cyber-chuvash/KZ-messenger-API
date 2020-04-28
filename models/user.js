
module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 15]
      }
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    }
  }, {
    paranoid: false,   // actually delete a row on .destroy
    indexes: [
      {fields: ['userId'], unique: true},
      {fields: ['email'], unique: true},
    ]
  });

  user.associate = (models) => {
    // associations can be defined here
  };

  return user;
};