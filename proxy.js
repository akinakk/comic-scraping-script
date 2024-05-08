const axios = require('axios');
const cheerio = require('cheerio');

async function fetchAndDisplayComics() {
    try {
        const response = await axios.get('https://poorlydrawnlines.com/archive/');
        const $ = cheerio.load(response.data);

        $('.et_pb_post').each((index, element) => {
            if (index < 10) { 
                const comicTitle = $(element).find('.entry-title a').text().trim();
                const comicUrl = $(element).find('.entry-title a').attr('href');
                console.log(`${index + 1}. Title: ${comicTitle}, URL: ${comicUrl}`);
            }
        });
    } catch (error) {
        console.error('Error fetching comics:', error);
    }
}

fetchAndDisplayComics();
