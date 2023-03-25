const Sequelize = require('sequelize');
const db = require('./db');

const Music = db.define('musics', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  music: Sequelize.DataTypes.TEXT
});

// Music.sync();

module.exports = Music;