const fs = require("fs");
let content = fs.readFileSync("styles.css", "utf-8");

content = content.replace(/\/\* Dark mode blend for white images \*\/\s*filter: invert\(1\) hue-rotate\(180deg\) brightness\(1\.2\);\s*mix-blend-mode: screen;/g, "");

content = content.replace(
    /\.section-title\s*\{\s*font-size: 28px;\s*font-weight: 800;\s*margin-bottom: 35px;\s*color:\s*var\(--primary-blue\);/g,
    `.section-title {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 35px;
    color: var(--secondary-yellow);`
);

fs.writeFileSync("styles.css", content);
