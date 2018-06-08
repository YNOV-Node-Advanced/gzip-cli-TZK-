const { getRecursiveFilesFromFolder } = require('../gzip.js');

const DIR = __dirname + '/files/';

function transformPath(absolutePath) {
    return DIR + '/' + absolutePath;
}

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
