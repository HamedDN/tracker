const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;
const JSON_SERVER_PORT = 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/track', (req, res) => {
    res.sendFile(path.join(__dirname, 'track.html'));
});

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.post('/api/add-item', async (req, res) => {
    try {
        const response = await axios.post(`http://localhost:${JSON_SERVER_PORT}/items`, req.body);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('Error adding item');
    }
});

app.get('/api/items', async (req, res) => 
    {
        try
        {
            const response = await axios.get(`http://localhost:${JSON_SERVER_PORT}/items`);
            res.status(200).send(response.data);
        } 
        catch (error) 
        {
            res.status(500).send('Error retrieving items');
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
