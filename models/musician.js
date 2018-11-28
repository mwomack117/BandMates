module.exports = function (sequelize, DataTypes) {
  var Musician = sequelize.define("Musician", {
    username: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    soloOrBand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instrument: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yearsExp: DataTypes.INTEGER,
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 300]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Musician;
};
