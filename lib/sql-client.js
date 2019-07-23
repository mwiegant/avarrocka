(function(module) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'admin',
        password : 'iamgroot',
        database : 'dnd'
    });

    var sqlClient = {};

    sqlClient.getMilitaryCards = function() {

        var cards = [];
        var query = `
            SELECT id, Name, Keywords, Attack, Defense, Power, Toughness, Morale, Size, Casulty 
              FROM dnd.Military 
            WHERE Alive is true;
        `;

        connection.connect();

        connection.query(query, function (error, results, fields) {
            if (error) throw error;

            results.forEach( function(result) {
                cards.push( {
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
        });

        connection.end();

        return cards;
    };

    module.exports = sqlClient;

})(module);


