const fs = require('fs');
const path = require('path');


const getFilesNames = async () => {

  try {
    const files = await fs.promises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
    const fileNames = files.filter(file => file.isFile()).map(file => file.name);

    fileNames.forEach((fileName) => {
      fs.stat(path.join(__dirname, 'secret-folder', `${fileName}`), (err, stats) => {
        let name;
        let fileSize; 
        let ext; 

        fileSize = stats.size;
        ext = path.extname(`${fileName}`).replace('.', '');
        name = fileName.match(/.*(?=\.)/);
          
        console.log(`${name} - ${ext} - ${fileSize}`);
      }); 
    });
      
  } catch (err) {
    console.log(err);
  }
};

getFilesNames();