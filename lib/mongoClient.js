(function (module) {
  const UNITS = 'units';

  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017';
  const dbName = 'dnd';
  const client = new MongoClient(url);

  let mongoClient = {};

  /*
  To prevent issues from connecting multiple times, immediately connect as soon as this file is exported
   */
  client.connect(function(err) {
    if (err)
      console.error(`Error while opening a connection to MongoDB: ${err}`);
    else
      console.log('Successfully connected to MongoDB.');
  });


  mongoClient.getAllAliveUnits = function(callback) {
    const collection = client.db(dbName).collection(UNITS);
    const query = {Alive: true};

    collection.find(query).toArray(function(err, docs) {
      if (err)
        console.error(err);

      callback(docs);
    });
  };

  module.exports = mongoClient;

})(module);


