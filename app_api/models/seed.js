const fs = require('fs');
const path = require('path');
const mongoose = require('./db');
const Trip = require('./travlr');

const tripsFile = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsFile, 'utf8'));

const seedDatabase = async () => {
  try {
    await Trip.deleteMany({});
    console.log('Existing trip records removed.');

    await Trip.insertMany(trips);
    console.log(`${trips.length} trip records inserted.`);
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

mongoose.connection.once('connected', seedDatabase);
