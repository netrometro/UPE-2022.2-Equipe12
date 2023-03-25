const Sequelize = require('sequelize');

const sequelize = new Sequelize('upemusic', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
  console.log("conexão com o banco de dados realizada com sucesso");
}).catch(function(){
  console.log("Erro: Conexão com o banco de dados não foi realizada");
});

module.exports = sequelize;