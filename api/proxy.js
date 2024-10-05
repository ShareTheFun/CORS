const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());

// Route to handle incoming requests
app.get('/api/*', (req, res) => {
    const url = req.params[0]; // Get the URL part after /api/
    const fullUrl = decodeURIComponent(url); // Decode the URL for proper handling

    // Validate URL
    if (!fullUrl.startsWith('http')) {
        return res.status(400).json({ error: 'Invalid URL provided.' });
    }

    // Make a request to the target API
    request({ url: fullUrl, method: 'GET', headers: { 'x-requested-with': 'XMLHttpRequest' } }, (error, response, body) => {
        if (error) {
            return res.status(500).json({ error: 'Error fetching data: ' + error.message });
        }

        if (response.statusCode !== 200) {
            return res.status(response.statusCode).json({ error: `Error fetching data: ${body}` });
        }

        // Send the response back
        res.header('Content-Type', 'application/json');
        res.send(body);
    });
});

// Export the app
module.exports = app;
