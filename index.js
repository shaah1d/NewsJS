const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.get('/search', async(req,res) => {
    const query = req.query.query;
const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=893537fec34b4b71be4743752ed4c545`)
const data = response.data;
const titles = data.articles.map(item => item.title);
const urls = data.articles.map(item => item.url);
const images = data.articles.map(item => item.urlToImage);
const authors = data.articles.map(item => item.author);
const sources = data.articles.map(item => item.source.name);
// for(let i=0; i<titles.length; i++) {

// console.log('*********************************')
// console.log(titles[i]);
// console.log('*********************************')
// }
res.render('home' ,{titles: titles,
query: query,
urls: urls,
images: images,
authors: authors,
sources: sources})
})

app.listen(3000, () => {
    console.log('LISTENING TO PORT 3000')
});
