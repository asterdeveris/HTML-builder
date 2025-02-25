const path = require('path');
const fs = require('fs');

const createFolder = async (path) => {
  try {
    await fs.promises.mkdir(path, {
      recursive: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const copyFiles = async (from, to) => {
  try {
    const files = await fs.promises.readdir(from, { withFileTypes: true });
    createFolder(to);
    for (let file of files) {
      const fromPath = path.join(from, file.name);
      const toPath = path.join(to, file.name);
      if (file.isDirectory()) {
        await copyFiles(fromPath, toPath);
      } else {
        fs.copyFile(fromPath, toPath, (err) => {
          if (err) return console.log(err);
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const mergeFiles = async (from, to) => {
  const output = fs.createWriteStream(to);
  const files = await fs.promises.readdir(from, { withFileTypes: true });
  const mergedFiles = files.filter(
    (file) => file.isFile() && file.name.endsWith('.css')
  );

  mergedFiles.forEach((file) => {
    const input = fs.createReadStream(`${from}\\${file.name}`, 'utf-8');
    input.pipe(output);
  });
};

fs.copyFile(
  path.join(__dirname, 'template.html'),
  path.join(__dirname, 'project-dist', 'index.html'),
  () => {}
);

createFolder(path.join(__dirname, 'project-dist'));
copyFiles(
  path.join(__dirname, 'assets'),
  path.join(__dirname, 'project-dist', 'assets')
);
mergeFiles(
  path.join(__dirname, 'styles'),
  path.join(__dirname, 'project-dist', 'style.css')
);

(async () => {
  const readdir = await fs.promises.readdir(path.join(__dirname, 'components'));

  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    let html = data;
    readdir.forEach((el) => {
      const elName = el.replace('.html', '');
      if (html.includes(`{{${elName}}}`)) {
        fs.readFile(
          path.join(__dirname, 'components', `${el}`),
          'utf-8',
          (err, dataFirst) => {
            html = html.replace(`{{${elName}}}`, `${dataFirst}`);

            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              html,
              (err) => {
                if (err) console.log(err);
              }
            );
          }
        );
      }
    });
  });
})();
