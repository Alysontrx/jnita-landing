const fs = require("fs");
let css = fs.readFileSync("styles.css", "utf-8");

// 1. Dark Mode Root Variables
const darkRoot = `:root {
    --primary-blue: #004c97;
    --primary-blue-dark: #00366b;
    --secondary-yellow: #f9a826;
    --secondary-yellow-dark: #e09620;

    /* Premium Dark Mode Slate */
    --text-dark: #e2e8f0;
    --text-light: #94a3b8;
    --bg-color: #0f172a;
    --bg-alt: #1e293b;
    --surface-color: rgba(30, 41, 59, 0.7);

    --white: #ffffff;
    --border-color: #334155;

    --success-green: #10b981;
    --danger-red: #ef4444;

    /* Soft, deep modern shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 10px 25px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.6);

    /* Rounded corners */
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-full: 9999px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}`;
css = css.replace(/:root\s*\{[\s\S]*?--transition:[^\}]+\}/, darkRoot);

// 2. Mobile CSS (menu swipe, search bar)
const mobileFixes = `

/* MOBILE RESPONSIVENESS AND MENU SWIPE FIXES */
@media (max-width: 768px) {
    .search-bar {
        min-width: 0 !important;
        width: 100% !important;
    }
    .search-bar input {
        min-width: 0 !important;
        padding: 10px !important;
        font-size: 13px !important;
    }
    .search-bar button {
        padding: 0 15px !important;
    }
    .header-main-container {
        max-width: 100vw !important;
        overflow: hidden !important;
    }
    
    .header-nav {
        right: 0 !important;
        transform: translateX(100%);
        visibility: hidden;
        opacity: 0;
        transition: transform 0.3s ease, visibility 0.3s ease, opacity 0.3s ease;
    }
    
    .header-nav.mobile-open {
        transform: translateX(0);
        visibility: visible;
        opacity: 1;
    }
    body {
        background-attachment: scroll !important;
    }
}
`;
if (!css.includes("visibility: hidden;")) {
    css += mobileFixes;
}

// 3. Fix white backgrounds
css = css.replace(/background-color:\s*var\(--white\);/g, "background-color: var(--surface-color);");
css = css.replace(/background:\s*var\(--white\);/g, "background: var(--surface-color);");
css = css.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.95\)\s*!important;/g, "background: rgba(30, 41, 59, 0.95) !important;");
css = css.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.85\);/g, "background: rgba(15, 23, 42, 0.6);");

// 4. Wrapper CSS
const wrapperCss = `
.top-bg-wrapper {
    background: url("assets/fundo-loja.jpg.jpg") center/cover no-repeat;
    position: relative;
}
.top-bg-wrapper::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.4);
    z-index: 1;
}
.top-bg-wrapper > section {
    position: relative;
    z-index: 2;
}
`;
if (!css.includes(".top-bg-wrapper {")) {
    css += wrapperCss;
}

fs.writeFileSync("styles.css", css);
console.log("Everything restored!");
