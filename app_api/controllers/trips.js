const Trip = require('../models/travlr');

// GET: /api/trips - returns all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found in the database' });
    }

    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving trips', error: err.message });
  }
};

// GET: /api/trips/:tripCode - returns one trip by code
const tripsFindByCode = async (req, res) => {
  try {
    if (!req.params.tripCode) {
      return res.status(400).json({ message: 'Trip code is required' });
    }

    const trip = await Trip.find({ code: req.params.tripCode }).exec();

    if (!trip || trip.length === 0) {
      return res.status(404).json({ message: 'Trip code not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving trip', error: err.message });
  }
};

// POST: /api/trips - adds one new trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(400).json({ message: 'Error adding trip', error: err.message });
  }
};

// PUT: /api/trips/:tripCode - updates one trip by code
const tripsUpdateTrip = async (req, res) => {
  try {
    if (!req.params.tripCode) {
      return res.status(400).json({ message: 'Trip code is required' });
    }

    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip code not found' });
    }

    return res.status(200).json(updatedTrip);
  } catch (err) {
    return res.status(400).json({ message: 'Error updating trip', error: err.message });
  }
};

// DELETE: /api/trips/:tripCode - deletes one trip by code
const tripsDeleteTrip = async (req, res) => {
  try {
    if (!req.params.tripCode) {
      return res.status(400).json({ message: 'Trip code is required' });
    }

    const deletedTrip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();

    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip code not found' });
    }

    return res.status(200).json({ message: 'Trip deleted', trip: deletedTrip });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting trip', error: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
