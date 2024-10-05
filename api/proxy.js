const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS
app.use(cors());

// Endpoint to handle requests
app.get('/api/*', (req, res) => {
    // Get the target URL from the request path
    const targetUrl = req.url.replace('/api/', '');

    // Log the target URL for debugging
    console.log('Target URL:', targetUrl);

    // Check for required headers
    const origin = req.headers.origin;
    const xRequestedWith = req.headers['x-requested-with'];

    if (!origin && !xRequestedWith) {
        return res.status(400).json({
            message: "Missing required request header. Must specify one of: origin, x-requested-with"
        });
    }

    // Forward the request to the target URL
    request({ url: targetUrl, method: 'GET' }, (error, response, body) => {
        if (error) {
            console.error('Error fetching the target URL:', error);
            return res.status(500).json({ message: 'Error fetching the target URL' });
        }

        // Log the response body for debugging
        console.log('Response Body:', body);

        // Set CORS headers
        res.set('Access-Control-Allow-Origin', '*');

        // Try to parse the body as JSON
        try {
            const jsonResponse = JSON.parse(body);
            res.json(jsonResponse);
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            // If parsing fails, send the raw body with a 200 status
            res.status(200).send(body); // Send as plain text
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
