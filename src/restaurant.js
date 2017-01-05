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
                'origin': ''
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

