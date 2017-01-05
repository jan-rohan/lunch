let express = require('express');
let nunjucks = require('nunjucks');
let request = require('request');

let Restaurant = require('./src/restaurant');
let config = require('./src/config.js');

let app = express();
let port = 8080;

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true,
    tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '<$',
        variableEnd: '$>',
        commentStart: '<#',
        commentEnd: '#>'
    }
});

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/api/v1/list', (req, res) => {
    let tasks = [];
    config.restaurants.forEach(restaurant => {
        tasks.push(restaurant.parse());
    });

    Promise.all(tasks).then(() => {
        res.json(config.restaurants);
    });
});

app.get('/', (req, res) => {
    res.render('index.html', { username: "Honzo" });
});

app.listen(port, () => {
    console.log(`Listen on ${port}...`);
});
