// api/proxy.js
const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

app.get('/proxy', (req, res) => {
    const url = req.query.url; // Extract the URL from query parameters
    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    request(url, (error, response, body) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch the URL' });
        }
        res.setHeader('Access-Control-Allow-Origin', '*'); // Set CORS headers
        res.status(response.statusCode).send(body); // Forward the response body
    });
});

// Export the app for Vercel
module.exports = app;
