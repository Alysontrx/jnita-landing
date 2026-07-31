const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf-8");

const customSmoothScroll = `
                // Custom smooth scroll animation (ignores OS/browser limitations)
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // ms
                let start = null;

                window.requestAnimationFrame(function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Easing function (easeOutCubic)
                    const ease = 1 - Math.pow(1 - percentage, 3);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                });
`;

appJs = appJs.replace(
    /window\.scrollTo\(\{[\s\S]*?behavior:\s*.smooth.[\s\S]*?\}\);/,
    customSmoothScroll
);

fs.writeFileSync("app.js", appJs);
console.log("Replaced with custom smooth scroll!");

