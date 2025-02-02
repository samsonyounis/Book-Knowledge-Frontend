const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/lms-app')));

// Send all requests to the index.html file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/lms-app/index.html'));
});

// Heroku will provide a dynamic port
app.listen(process.env.PORT || 8080, () => {
  console.log('App is listening on port ' + (process.env.PORT || 8080));
});
