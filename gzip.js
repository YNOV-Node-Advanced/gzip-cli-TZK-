const fs = require("fs");
const zlib = require("zlib");
const { promisify } = require("util");

const readdirAsync = promisify(fs.readdir);
const lstatAsync = promisify(fs.lstat);
const compress = zlib.createGzip();

async function compressFile(filename) {
    return new Promise((resolve, reject) => {
        let gzip = zlib.createGzip();
        let readStream = fs.createReadStream(input);
        let writeStream = fs.createWriteStream(output);

        readStream.pipe(gzip);
        gzip.pipe(writeStream);

        readStream.on("error", error => reject(error))
        gzip.on("error", error => reject(error));
        writeStream.on("error", error => reject(error));
        writeStream.on("close", () => resolve());
    });
}

async function getRecursiveFilesFromFolder(folder) {
    let filePaths = [];
    const files = await readdirAsync(folder);

    const promises = files.map(async (file) => {
        const filepath = folder + '/' + file;
        const stats = await lstatAsync(filepath);

        if (stats.isDirectory()) {
            const recursiveFiles = await getRecursiveFilesFromFolder(filepath);
            filePaths = filePaths.concat(recursiveFiles);
        } else {
            filePaths.push(filepath);
        }
    });

    await Promise.all(promises);

    return filePaths;
}

module.exports = {
    getRecursiveFilesFromFolder
}
