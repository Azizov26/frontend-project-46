import path from 'path';
import fs from 'fs';

import stylish from './formatter/stylish.js';
import parse from './parses.js';
import getDiffInformation from './gendiffInform.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), '_fixtures_', filepath);
const readfile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => path.extname(filename);

const gendiff = (filepath1, filepath2) => {
  const file1 = readfile(filepath1);
  const file2 = readfile(filepath2);
  const parseFile1 = parse(file1, getFormat(filepath1));
  const parseFile2 = parse(file2, getFormat(filepath2));
  const tree = getDiffInformation(parseFile1, parseFile2);
  return stylish(tree);
};

export default gendiff;
