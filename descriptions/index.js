// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// Bypass CORS error
app.use(cors());

// Create a data structure to hold all descriptions related to a service
const descriptionsByServiceId = {};

/**
 * Route handler to send all descriptions by service ID
 * Either send all descriptions or send an empty array
 */
app.get('/services/:id/descriptions', (req, res) => {
  res.send(descriptionsByServiceId[req.params.id] || []);
});

/**
 * Route handler to create a description
 * Generate id for the description via randomBytes
 * Extract the description from the req body
 * Init all descriptions associated to the id or send back an empty array if none
 * Push the new id and description into descriptions
 * Async & Await post to event bus anytime a description is made
 * Send all descriptions with a status of 201
 */
app.post('/services/:id/descriptions', async (req, res) => {
  const descriptionId = randomBytes(4).toString('hex');
  const { description } = req.body;

  const descriptions = descriptionsByServiceId[req.params.id] || [];

  descriptions.push({ id: descriptionId, description });

  descriptionsByServiceId[req.params.id] = descriptions;

  await axios.post('http://localhost:4005/events', {
    type: 'DescriptionCreated',
    data: {
      id: descriptionId,
      description,
      serviceId: req.params.id
    }
  });

  res.status(201).send(descriptions);
});

/**
 * Route handler endpoint to send a response back when receiving a response from event-bus
 * Respond with status of OK
 * Response has 2 params: received event & response type
 */
app.post('/events', (req, res) => {
  console.log('Receied event.', req.body.type);

  res.send({});
});

// Start the server and listen on port 4001
app.listen(4001, () => {
  console.log('Listening on port 4001...');
});
