(function (module) {
  var async = require('async');
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'iamgroot',
    port: 3306
  });

  var sqlClient = {};

  sqlClient.getAllAliveUnits = function (callback) {

    var units = [];
    var query = `
            SELECT id, Name, Keywords, Attack, Defense, Power, Toughness, Morale, Size, Casulty 
              FROM dnd.Military 
            WHERE Alive IS true;
        `;

    async.series([
      function (cb) {
        connection.query(query, function (error, results, fields) {
          if (error) throw error;

          results.forEach(function (result) {
            units.push({
              id: result.id,
              name: result.Name,
              keywords: result.Keywords,
              attack: result.Attack,
              defense: result.Defense,
              power: result.Power,
              toughness: result.Toughness,
              morale: result.Morale,
              size: result.Size,
              casulty: result.Casulty
            })
          });

          cb();
        });
      }
    ], function (err, result) {
      if (err)
        console.error(`error while interacting with mysql database: ${e}`);

      callback(units);
    });
  };

  module.exports = sqlClient;

})(module);


