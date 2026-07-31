const fs = require("fs");
let content = fs.readFileSync("styles.css", "utf-8");

// 1. Add background image to body
content = content.replace(
    /body\s*\{\s*font-family[^}]+\}/,
    `body {
    font-family: "Inter", sans-serif;
    background-color: var(--bg-color);
    background-image: url("assets/fundo-loja.jpg.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: var(--text-dark);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    width: 100%;
    position: relative;
}`
);

// 2. Change root variables for dark mode
const root_pattern = /:root\s*\{[^}]+\}/;
const dark_root = `:root {
    --primary-blue: #60a5fa;
    --primary-blue-dark: #3b82f6;
    --secondary-yellow: #f9a826;
    --secondary-yellow-dark: #e09620;

    --text-dark: #f1f5f9;
    --text-light: #94a3b8;
    --bg-color: rgba(15, 23, 42, 0.75);
    --bg-alt: rgba(30, 41, 59, 0.75);
    --surface-color: rgba(15, 23, 42, 0.85);

    --white: #ffffff;
    --border-color: rgba(255, 255, 255, 0.1);

    --success-green: #10b981;
    --danger-red: #ef4444;

    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.4);

    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-full: 9999px;

    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}`;
content = content.replace(root_pattern, dark_root);

// 3. Add backdrop-filters for glassmorphism
content = content.replace(/background-color:\s*var\(--white\);/g, "background-color: var(--surface-color);\n    backdrop-filter: blur(10px);");
content = content.replace(/background:\s*var\(--white\);/g, "background: var(--surface-color);\n    backdrop-filter: blur(10px);");
content = content.replace(/background-color:\s*var\(--bg-color\);/g, "background-color: var(--bg-color);\n    backdrop-filter: blur(10px);");
content = content.replace(/background:\s*var\(--bg-color\);/g, "background: var(--bg-color);\n    backdrop-filter: blur(10px);");
content = content.replace(/background-color:\s*var\(--bg-alt\);/g, "background-color: var(--bg-alt);\n    backdrop-filter: blur(10px);");
content = content.replace(/background:\s*var\(--bg-alt\);/g, "background: var(--bg-alt);\n    backdrop-filter: blur(10px);");

// 4. Invert white images for dark mode
content = content.replace(
    /\.logo-img\s*\{([^}]*)\}/,
    `.logo-img {$1\n    /* Dark mode blend for white images */\n    filter: invert(1) hue-rotate(180deg) brightness(1.2);\n    mix-blend-mode: screen;\n}`
);

content = content.replace(
    /\.banner-img\s*\{([^}]*)\}/,
    `.banner-img {$1\n    /* Dark mode blend for white images */\n    filter: invert(1) hue-rotate(180deg) brightness(1.2);\n    mix-blend-mode: screen;\n}`
);

fs.writeFileSync("styles.css", content);

