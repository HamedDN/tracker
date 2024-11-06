const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;
const JSON_SERVER_PORT = 3001;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser for JSON data
app.use(express.json());

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

// API route to add an item to the database
app.post('/api/add-item', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:${JSON_SERVER_PORT}/items`, req.body);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('Error adding item');
    }
});

// API route to get items from the database
app.get('/api/items', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:${JSON_SERVER_PORT}/items`);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('Error retrieving items');
    }
});

// Start the main server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
