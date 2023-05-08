const path = require('path');
const fs = require('fs');

const createFolder = async () => {
  try {
    await fs.promises.mkdir(path.join(__dirname, 'files-copy'), {
      recursive: false,
    });
  } catch (err) {
    console.log(err);
  }
};

const copyFolder = async () => {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, 'files'));
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', `${file}`), path.join(__dirname, 'files-copy', `${file}`), (err) => {
        if (err) return console.log(err);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

createFolder();
copyFolder();
