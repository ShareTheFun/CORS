const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/ytdl', (req, res) => {
    const url = req.query.link;

    request(url).pipe(res);
});

app.listen(PORT, () => {
    console.log(`CORS Proxy running on port ${PORT}`);
});
