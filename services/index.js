// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create an express app
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// Bypass CORS
app.use(cors());

// Init a data structure to to store all services
const services = {};

/**
 * Route handler endpoint to send all services upon a GET request
 */
app.get('/services', (req, res) => {
  res.send(services);
});

/**
 * Route handler endpoint to create a service upon a client POST submission
 * Generate a new service id via randomBytes
 * Extract the name
 * Assign to projects in association to the id generated
 * Await & Async POST to event bus when a project is created
 * Send the status to projects
 */
app.post('/services', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { name } = req.body;

  services[id] = {
    id, name
  }

  await axios.post('http://localhost:4005/events', {
    type: 'ServiceCreated',
    data: {
      id, name
    }
  });

  res.status(201).send(services[id]);
});

/**
 * Route handler to respond when receiving responses from event bus
 * Responds with status of OK
 * Response has 2 parameters: received event & request body type
 */
app.post('/events', (req, res) => {
  console.log('Recevied event.', req.body.type);

  res.send({});
});

// Start server and start listening on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000...');
});
