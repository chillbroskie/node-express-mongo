const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

  assert.strictEqual(err, null);

  console.log('Connected to the MongoDB server');

  const db = client.db(dbname);

  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null);
    console.log('dropped collection', result);

    const collection = db.collection('campsites');

    collection.insertOne({name: "BreadcrumbTrail Campground", description: "test"}, (err, result) => {
      assert.strictEqual(err, null);
      console.log('Insert Document:', result.ops);

      collection.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        console.log('found document:', docs);

        client.close();
      });
    });
  });


});