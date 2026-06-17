const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);
    const json = await response.json();

    if (!Array.isArray(json)) {
      return res.render('travel', {
        title: 'Travlr Getaways',
        trips: [],
        message: 'Trip data could not be loaded.'
      });
    }

    if (json.length === 0) {
      return res.render('travel', {
        title: 'Travlr Getaways',
        trips: [],
        message: 'No trips are currently available.'
      });
    }

    return res.render('travel', {
      title: 'Travlr Getaways',
      trips: json
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  travel
};
