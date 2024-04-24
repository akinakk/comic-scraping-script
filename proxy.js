const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/comics', async (req, res) => {
    try {
        const comics = [];
        for (let i = 100; i <= 110; i++) {
            const response = await axios.get(`https://xkcd.com/${i}/`);
            const $ = cheerio.load(response.data);
            const comicImageUrl = $('#comic img').attr('src');
            comics.push(`https:${comicImageUrl}`);
        }
        res.json(comics);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching first ten XKCD comics');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
