const fs = require('fs');
const { getRecursiveFilesFromFolder, compressFile } = require('../gzip.js');

const DIR = __dirname + '/files/';

function transformPath(absolutePath) {
    return DIR + '/' + absolutePath;
}

describe('getRecursiveFilesFromFolder', () => {
    it('returns the files in the root folder', () => {
        return expect(getRecursiveFilesFromFolder(DIR))
            .resolves
            .toEqual(expect.arrayContaining([
                transformPath('a.txt'),
                transformPath('b.txt')
            ]));
    });

    it('returns the files in subdirectories', () => {
        return expect(getRecursiveFilesFromFolder(DIR))
            .resolves
            .toEqual(expect.arrayContaining([
                transformPath('subdir/c.txt'),
                transformPath('subdir/d.txt')
            ]));
    });
});

describe('compressFile', () => {
    it('stores the compresed file at a given path', () => {
        compressFile(transformPath('a.txt'), transformPath('a.txt.gz')).then((path) => {
            expect(fs.existsSync(path)).toBeTruthy();
        });
    });
});
