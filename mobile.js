const fs = require("fs");
let css = fs.readFileSync("styles.css", "utf-8");

// Add info-block h3 color
css += `\n\n/* Custom Request: Yellow info-block headings */\n.info-block h3 {\n    color: var(--secondary-yellow) !important;\n}\n`;

// Fix mobile background attachment bug
css += `\n@media (max-width: 768px) {\n    body {\n        background-attachment: scroll !important;\n    }\n}\n`;

fs.writeFileSync("styles.css", css);
