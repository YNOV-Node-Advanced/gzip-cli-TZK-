const { getRecursiveFilesFromFolder } = require('./gzip');
const args = process.argv.slice(2);

if (args[0] === undefined) {
    console.error("Usage: node index.js /path/to/folder");
    return;
}

getRecursiveFilesFromFolder(args[0]).then((files) => console.log(files));
