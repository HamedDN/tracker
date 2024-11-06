const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Route for /home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Route for /track
app.get('/track', (req, res) => {
    res.sendFile(path.join(__dirname, 'track.html'));
});

// Redirect root URL to /home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
