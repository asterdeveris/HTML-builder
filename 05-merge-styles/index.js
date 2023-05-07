const path = require('path');
const fs = require('fs');

const output = fs.createWriteStream(path.join(__dirname, 'bundle.css'));

const createBundle = async () => {
  const files = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  const cssFiles = files.filter(file => file.isFile() && file.name.endsWith('.css'));

  cssFiles.forEach(file => {
    const input = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), 'utf-8');
    input.pipe(output);
  });
    
};

createBundle();