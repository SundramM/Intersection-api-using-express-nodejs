const express = require('express');
const bodyParser = require('body-parser');
const intersectionsRoute = require('./routes/intersections');

const app = express();
const port = 3000; // Change this to your desired port

app.use(bodyParser.json());

// API routes
app.use('/api/intersections', intersectionsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
