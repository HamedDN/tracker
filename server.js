const express = require('express');
const path = require('path');
const axios = require('axios');
const jalaali = require('jalaali-js');
const cors = require('cors');
const app = express();
const PORT = 3000;
const JSON_SERVER_PORT = 3001;

const STATUS_IN_PROGRESS = 'در حال بررسی';
const STATUS_RREFERRAL_TO_ANOTHER_UNIT = 'ارجاع به واحد دیگر';
const STATUS_ANSWERED = 'پاسخ داده شده';
const STATUS_COMPLETED = 'تکمیل شده';
const STATUS_PENDING = 'معلق یا منتظر پاسخ';
const STATUS_REJECTED = 'رد شده';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get(
    '/home',
    (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'home.html'));
    }
);

app.get(
    '/track', 
    (req, res) =>
    {
        res.sendFile(path.join(__dirname, 'track.html'));
    }
);

app.get(
    '/',
    (req, res) =>
    {
        res.redirect('/home');
    }
);

app.post(
    '/api/add-item',
    async (req, res) =>
    {
        try
        {
            let itemData = req.body;

            const number = itemData.number;

            if(!number)
                return res.status(400).send('Item number is required');

            const today = jalaali.toJalaali(new Date());
            const year = today.jy;
            const month = today.jm;
            const day = today.jd;
            const formattedDate = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;

            const newItemData = {
                ...itemData,
                date: formattedDate,
                id: Math.floor(Math.random() * 1000),
                status: STATUS_PENDING
            };
            const response = await axios.get(`http://localhost:${JSON_SERVER_PORT}/items`);

            const existingItem = response.data.find(item => item.number === number);

            if(existingItem)
            {
                const updateResponse = await axios.put(`http://localhost:${JSON_SERVER_PORT}/items/${existingItem.id}`, newItemData);
                res.status(200).send(updateResponse.data);
            }
            else
            {
                const createResponse = await axios.post(`http://localhost:${JSON_SERVER_PORT}/items`, newItemData);
                res.status(201).send(createResponse.data);
            }
        }
        catch (error)
        {
            console.log(error);
            res.status(500).send('Error adding or updating item');
        }
    }
);

app.post(
    '/api/items',
    async (req, res) =>
    {
        try
        {
            let { number, role } = req.body;

            const response = await axios.get(`http://localhost:${JSON_SERVER_PORT}/items`);

            let filteredItems = response.data;

            if(number)
                filteredItems = filteredItems.filter(item => item.number === number);
            if(role)
                filteredItems = filteredItems.filter(item => item.role === role);

            res.status(200).send(filteredItems);
        }
        catch (error)
        {
            res.status(500).send('Error retrieving items');
        }
    }
);

app.listen(
    PORT,
    () =>
    {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
);