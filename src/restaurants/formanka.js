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
            let finish = false;
            let exit = false;

            let days = [
                'pondělí',
                'úterý',
                'středa',
                'čtvrtek',
                'pátek',
            ];

            let day = new Date().getDay() - 1;
            if (day > days.length) {
                resolve();
                return;
            }

            $('.bigbox .static .text p').each((i, elem) => {

                if (exit) {
                    return;
                }

                let text = $(elem).text().trim();
                let ltext = text.toLowerCase();
                let html = $(elem).html().trim();

                if (ltext.startsWith(days[day]) ) {
                    enable = true;
                    counter++;
                    if (counter == 1)
                        return;
                }

                if (enable) {

                    if (text.toLowerCase().startsWith('hlavní jídla')) {
                        return;
                    }

                    if (day < 5 && ltext.startsWith(days[day + 1])) {
                        exit = true;
                        return;
                    }


                    if (finish && html.startsWith('<strong>') ) {
                        exit = true;
                        return;
                    }

                    let line = text.replace(/\s\s+/g, ' ');
                    let lastSpaceIndex = line.lastIndexOf(' ');
                    let name = line.substring(0, lastSpaceIndex);
                    let price = line.substring(lastSpaceIndex).replace('K', ' K');
                    if (text.length > 10) {
                        finish = true;
                        this.addItem(name, price);
                    }
                }
            });

            console.log("Formanka finished.");
            resolve();
        });
    }

}




