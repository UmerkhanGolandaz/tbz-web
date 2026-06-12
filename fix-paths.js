const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/"\/img\//g, '"/tbz-web/img/');
  content = content.replace(/"\/hero\.jpg"/g, '"/tbz-web/hero.jpg"');
  content = content.replace(/"\/tbz-logo\.png"/g, '"/tbz-web/tbz-logo.png"');
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
