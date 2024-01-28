// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// Bypass CORS error
app.use(cors());

// Create a data structure to store all services (including descriptions)
const services = {};

/**
 * Route handler to send all services upon request
 */
app.get('/services', (req, res) => {
  res.send(services);
});

/**
 * Route handler to handle all POST events
 * Extracts type & data sent from event bus
 * Runs type checks and associates the types to services
 * Sends status of OK
 */
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'ServiceCreated') {
    const { id, name } = data;

    services[id] = { id, name, descriptions: [] };
  }

  if (type === 'DescriptionCreated') {
    const { id, desription, serviceId } = data;

    const service = services[serviceId];

    service.descriptions.push({ id, description });
  }

  console.log(services);

  res.send({});
});

// Start the server & listen on port 4002
app.listen(4002, () => {
  console.log('Listening on port 4002...');
});

