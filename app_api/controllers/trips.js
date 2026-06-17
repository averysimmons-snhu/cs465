const Trip = require('../models/travlr');

// GET: /api/trips - returns all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();

    if (!trips) {
      return res.status(404).json({ message: 'Trips not found' });
    }

    if (trips.length === 0) {
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

module.exports = {
  tripsList,
  tripsFindByCode
};
