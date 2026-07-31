const fs = require("fs");
let css = fs.readFileSync("styles.css", "utf-8");

// Fix notification
css = css.replace(
    /\.slide-content\s*\{([\s\S]*?opacity:\s*0;)/g,
    (match) => match.replace("background: rgba(255, 255, 255, 0.3);", "background: var(--surface-color);")
);
css += `\n\n.slide-content h2 { color: var(--secondary-yellow) !important; }\n`;
css += `.slide-btn { background: #25D366 !important; color: white !important; border-color: transparent !important; }\n`;
css += `.slide-btn:hover { background: #1ebd5a !important; }\n`;

// Add massive responsive block
css += `
@media (max-width: 768px) {
    .reliquia-grid, .history-content, .footer-grid, .location-content {
        grid-template-columns: 1fr !important;
        flex-direction: column !important;
    }
    
    .reliquia-img-container {
        transform: none !important;
    }
    
    .section-title {
        font-size: 24px !important;
    }
    
    .header-main-container {
        gap: 15px !important;
    }
    
    .slide-content {
        bottom: 10px !important;
        right: 10px !important;
        left: 10px !important;
        max-width: 100% !important;
        padding: 20px !important;
    }
}
`;

fs.writeFileSync("styles.css", css);
