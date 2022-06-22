const fs = require('fs');
// eslint-disable-next-line
module.exports = JSON.parse(fs.readFileSync('package.json', 'utf8'));
