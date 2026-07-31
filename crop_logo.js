const jimp = require("jimp");
jimp.Jimp.read("assets/logo.png").then(image => {
    // Make left 400 pixels transparent
    image.scan(0, 0, 400, image.bitmap.height, function(x, y, idx) {
        this.bitmap.data[idx + 3] = 0;
    });
    
    // Make right 400 pixels transparent
    image.scan(image.bitmap.width - 400, 0, 400, image.bitmap.height, function(x, y, idx) {
        this.bitmap.data[idx + 3] = 0;
    });
    
    // Autocrop the transparent edges
    image.autocrop();
    
    return image.write("assets/logo.png");
}).then(() => {
    console.log("Successfully cropped logo!");
}).catch(err => {
    console.error(err);
});
