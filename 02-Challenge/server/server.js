const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Log the directory being served
console.log('Serving static files from:', path.join(__dirname, '../client/dist'));

// Serve static assets from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
  console.log('Serving index.html');
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Explicitly handle manifest and favicon routes
app.get('/manifest.json', (req, res) => {
  console.log('Serving manifest.json');
  res.sendFile(path.join(__dirname, '../client/dist/manifest.json'));
});

app.get('/favicon.ico', (req, res) => {
  console.log('Serving favicon.ico');
  res.sendFile(path.join(__dirname, '../client/favicon.ico'));
});

// Fallback route to handle all other routes
app.get('*', (req, res) => {
  console.log('Fallback: Serving index.html');
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
