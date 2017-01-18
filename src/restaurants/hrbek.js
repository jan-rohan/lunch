const Restaurant = require('../restaurant.js');

module.exports = class Hrbek extends Restaurant {

    constructor() {
        super('Hrbek', 'http://www.stravovanihrbek.websnadno.cz/jidelnicek.html');
    }

    parseInner(resolve, reject) {

        super.loadHtml((error, body, $) => {

            let imgSrc = $('img').first().attr('src');

            this.setImagePriceList(imgSrc);

            console.log("Hrbek finished.");
            resolve();
        });
    }

}




