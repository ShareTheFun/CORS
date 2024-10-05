const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS
app.use(cors());

// Endpoint to handle requests
app.get('/api/*', (req, res) => {
    const targetUrl = req.url.replace('/api/', '');

    console.log('Target URL:', targetUrl);

    const origin = req.headers.origin;
    const xRequestedWith = req.headers['x-requested-with'];

    if (!origin && !xRequestedWith) {
        return res.status(400).json({
            message: "Missing required request header. Must specify one of: origin, x-requested-with"
        });
    }

    request({ url: targetUrl, method: 'GET' }, (error, response, body) => {
        if (error) {
            console.error('Error fetching the target URL:', error);
            return res.status(500).json({ message: 'Error fetching the target URL', error });
        }

        console.log('Response Status Code:', response.statusCode);
        console.log('Response Headers:', response.headers);
        console.log('Response Body:', body);

        res.set('Access-Control-Allow-Origin', '*');

        try {
            const jsonResponse = JSON.parse(body);
            res.json(jsonResponse);
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            res.status(200).send(body); // Send as plain text
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
