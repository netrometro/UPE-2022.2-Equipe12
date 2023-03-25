const Sequelize = require('sequelize');
const db = require('./db');

const Music = db.define('musics', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  music: {
    type: Sequelize.STRING
  }
});

// Music.sync();

module.exports = Music;