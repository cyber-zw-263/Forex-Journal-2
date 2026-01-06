const fs = require('fs');
const path = require('path');
const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGD4DwABAgEAeIjq9wAAAABJRU5ErkJggg==';
const out = Buffer.from(base64, 'base64');
const dir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'logo.png'), out);
console.log('Wrote public/logo.png');
