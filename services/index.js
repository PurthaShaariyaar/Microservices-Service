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
 * Send the status to projects
 */
app.post('/services', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { name } = req.body;

  services[id] = {
    id, name
  }

  // TODO: Send to Event-Bus Functionality

  res.status(201).send(services[id]);
});

// TODO: Receive events from event bus

// Start server and start listening on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000...');
});
