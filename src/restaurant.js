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
            uri: this.url,
            method: 'GET',
            encoding: 'binary',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
                'Accept-Language': 'cs,en;q=0.8,en-US;q=0.6,sk;q=0.4',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Origin': ''
            },
        }, (error, response, body) => {

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

