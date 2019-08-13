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

  mongoClient.updateUnit = function(_unit, callback) {
    const collection = client.db(dbName).collection(UNITS);
    const query = {
      _id: _unit._id
    };

    const unit = Object.assign({}, _unit);

    delete unit._id;

    const update = {
      $set: unit
    };

    const upsert = {
      upsert: true
    };

    collection.updateOne(query, update, upsert, function(err, res) {
      if (err)
        console.error(`Error updating unit with id ${unit._id}: ${err}`);

      callback(err);
    })
  };

  mongoClient.saveUnit = function(unit, callback) {
    const collection = client.db(dbName).collection(UNITS);

    collection.insertOne(unit, function(err, res) {
      if (err)
        console.error(`Error inserting unit with id ${unit._id}: ${err}`);

      callback(err);
    })
  };

  module.exports = mongoClient;

})(module);


