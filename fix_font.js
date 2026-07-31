const fs = require("fs");
let css = fs.readFileSync("styles.css", "utf-8");
css = css.replace(
    /body\s*\{\s*background-image:/,
    "body {\n    font-family: \"Inter\", sans-serif;\n    background-color: var(--bg-color);\n    background-image:"
);
fs.writeFileSync("styles.css", css);
