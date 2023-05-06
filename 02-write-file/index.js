const { stdout: output, stdin: input } = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input, output });

const endProgram = () => {
  console.log('Bye!');
  process.exit();
};

fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) return console.log(err);
});

output.write('Type something to make my existence meaningful\n');
const outputFile = fs.createWriteStream(path.join(__dirname, 'text.txt')); 

rl.on('line', (line) => {
  if (line.includes('exit')) {
    outputFile.write(`${line.replace('exit', '')}`);
    endProgram();
  } else {
    outputFile.write(`${line} `);
  }
});  
    
rl.on('SIGINT', endProgram);




