import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('car_rental');

const connectdb = () => {
  return client.connect().then(() => {
    console.log('DB is connected successfully');
  }).catch((err) => {
    console.log('Failed to connect to DB', err);
  });
};

export {
  db, connectdb
};
