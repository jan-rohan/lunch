let Restaurant = require('../restaurant.js');

module.exports = class Bernard extends Restaurant {

    //self = this;

    constructor() {
        super('Bernard', 'http://bernardpub.cz/andel/');
    }

    parseInner(resolve, reject) {

        this.loadHtml((error, body, $) => {
            let items = $('#jidelnilistek .polozka');

            if (items.length > 0) {
                items.each((index, item) => {
                    let name = $(item).find('strong').text();
                    let price = $(item).find('em').text();
                    this.addItem(name, price);
                });
            }

            console.log("Bernard finished.");
            resolve();
        });
    }

}




