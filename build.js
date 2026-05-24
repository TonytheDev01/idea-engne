const fs = require("fs");

const key = process.env.GROQ_API_KEY || "YOUR-GROQ-API-KEY-HERE";
const content = `'use strict';
window.ENV = {
  GROQ_API_KEY: '${key}',
  NODE_ENV: 'production'
};`;

fs.writeFileSync("config.js", content);
console.log("✅ config.js generated");
