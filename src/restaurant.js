let request = require('request');
let cheerio = require('cheerio');



module.exports = class Restaurant {

    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.items = [];
        this.imagePriceList = null;
        this.type = null;
    }

    loadHtml(callback) {

        request({
            url: this.url,
            encoding: 'binary',
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
                'accept-language': 'cs,en;q=0.8,en-US;q=0.6,sk;q=0.4',
                'accept': '	text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'referer': 'https://www.google.cz/',
                'upgrade-insecure-requests': '1',
                'cache-control': 'max-age=0',
                'cookie': 'zl=cs; fbtrack=71d20f7456258ae46855cc97613773f4; fbcity=84; dpr=1; PHPSESSID=42876ceb29c4f13880b339c8d1ae4486c88a41bb; _ga=GA1.2.209776631.1483437898; __jpuri=https%3A//www.zomato.com/cs/widgets/daily_menu%3Fentity_id%3D16506447; ak_bmsc=EC2E59348354312AFC5F0E19E4BF627702154AC7C03900006E896E5836591117~plGjTvqs3HfbV9LtsTEL5m1J8zRaTb5iotvwgLHUviv8HbZ96SS4dz/j2bc1rR40GYT/We4SNVsGtlbEmiZtQNb5LW0AVgvfLQg+GyNM63C3rjVwkflGueUEKfSA5wmhIcVtAa+i6qT5O05WuFS9Rzy+ug5rq3umJfDXf8zo1z36o24/f/HKWJGMuftEOAq9vF+9vVWpln432kY3LkqRNlaQ=='
            },

        }, (error, response, body) => {

            console.log(error);

            let buf = Buffer.from(body, 'ascii');
            body = buf.toString('utf8');
            if (!error) {
                let $ = cheerio.load(body);
                callback(error, body, $);
            } else {
                console.log("Error: " + error);
            }
        });
    }

    addItem(name, price) {
        this.items.push({ name, price });
        this.type = "table";
    }

    setImagePriceList(url) {
        this.imagePriceList = url;
        this.type = "image";
    }

    getItems() {
        return this.items;
    }

    parse() {
        this.items = [];
        this.imagePriceList = null;
        return new Promise((resolve, reject) => {
            this.parseInner(resolve, reject);
        });
    }

}

