let moment = require('moment');
let Restaurant = require('../restaurant.js');

module.exports = class Formanka extends Restaurant {

    constructor() {
        super('Formanka', 'http://www.smichovskaformanka.cz/1-denni-menu');
    }

    parseInner(resolve, reject) {

        let self = this;
        this.loadHtml((error, body, $) => {

            let today = moment().format(', DD ');
            let counter = 0;
            let enable = false;
            $('.bigbox .static .text p').each((i, elem) => {

                let text = $(elem).text().trim();
                let html = $(elem).html().trim();

                if (html.startsWith('<strong>')) {
                    enable = true;
                    counter++;
                    if (counter == 1)
                        return;
                }

                if (counter > 3 || text.toLowerCase().startsWith('hlavní jídla')) {
                    return;
                }

                let line = text.replace(/\s\s+/g, ' ');
                let lastSpaceIndex = line.lastIndexOf(' ');
                let name = line.substring(0, lastSpaceIndex);
                let price = line.substring(lastSpaceIndex);
                if (text.length > 5) {
                    this.addItem(name, price);
                }
            });

            console.log("Formanka finished.");
            resolve();
        });
    }

}




