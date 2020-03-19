const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';

const executeCallback = function(callback) {
    MongoClient.connect(url, (err, client) => {
        if (err) { console.log('error occurred'); }
        const db = client.db('test');
        callback(db);
        client.close();
    });
};

const deleteDocuments = db => {
    db.collection('Cars').deleteMany((err, res) => {
        if (err) { console.log(`error occurred: ${err}`); }
        console.log(`deleted ${res.result.n} entries!`);
    });
};

const insertDocuments = db => {
    const cars = [
        {model:"Ford", year:2017},
        {model:"Nissan", year:2011},
        {model:"BMW", year:2016}
    ];
    db.collection('Cars').insertMany(cars, (err, res) => {
        if (err) { console.log(`error occurred: ${err}`); }
        console.log(`inserted ${res.insertedCount} entries!`);
    });
};

const filterDocuments = db => {
    db.collection('Cars')
      .find()
      .sort({model: 1})
      .toArray((err, docs) => {
          if (err) { console.log(`error occurred: ${err}`); }
          console.log(`there are ${docs.length} documents:`);
          docs.forEach(doc => console.log(doc));
      });
};

executeCallback(deleteDocuments);
executeCallback(insertDocuments);
executeCallback(filterDocuments);
