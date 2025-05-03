const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Serve index.html for any unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`React app running on http://localhost:${port}`);
});
