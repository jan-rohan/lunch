const Restaurant = require('../restaurant.js');
const getPixels = require("get-pixels")

module.exports = class Hrbek extends Restaurant {

    constructor() {
        super('Hrbek', 'http://www.stravovanihrbek.websnadno.cz/jidelnicek.html');
    }

    parseInner(resolve, reject) {

        super.loadHtml((error, body, $) => {

            let imgSrc = $('img').first().attr('src');
            
            this.setImagePriceList( imgSrc );

            console.log("hrbek start -----")
            getPixels(imgSrc, function(err, pixels) {
                if(err) {
                    console.log("Bad image path")
                    return
                }
                console.log("got pixels", pixels.shape.slice())
                console.log("Hrbek finished.");
                resolve();
            })


            
        });
    }

}




