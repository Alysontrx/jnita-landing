const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf-8");

const hashClearCode = `
    // Keep URL clean by removing hash on load or hashchange
    const clearHash = () => {
        if (window.location.hash) {
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }
    };
    clearHash();
    window.addEventListener("hashchange", clearHash);
`;

appJs = appJs.replace(
    "document.addEventListener(\"DOMContentLoaded\", () => {",
    "document.addEventListener(\"DOMContentLoaded\", () => {\n" + hashClearCode
);

fs.writeFileSync("app.js", appJs);
console.log("Added URL cleaner!");
