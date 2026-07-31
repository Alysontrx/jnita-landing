const jimp = require("jimp");
jimp.Jimp.read("assets/logo.png").then(image => {
    // Let"s sample the color at y=50, x=5 to be safely in the blue background
    const targetColor = image.getPixelColor(5, 50);
    const targetRGBA = jimp.intToRGBA(targetColor);
    console.log("Background color detected:", targetRGBA);

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // tolerance calculation
        const diff = Math.abs(r - targetRGBA.r) + Math.abs(g - targetRGBA.g) + Math.abs(b - targetRGBA.b);
        if (diff < 30) {
            this.bitmap.data[idx + 3] = 0; // make transparent
        }
    });
    
    // Create a backup of the original
    const fs = require("fs");
    fs.copyFileSync("assets/logo.png", "assets/logo_original.png");
    
    return image.write("assets/logo.png");
}).then(() => {
    console.log("Successfully removed background and saved as logo.png!");
}).catch(err => {
    console.error(err);
});
