import path from 'path';
import fs from 'fs';

import getDiffInformation from './gendiffInform.js';
import parse from './parses.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), '_fixtures_', filepath);
const readfile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf8');
const getFormat = (filename) => filename.split('.')[1];

const gendiff = (filepath1, filepath2) => {
  const file1 = readfile(filepath1);
  const file2 = readfile(filepath2);
  const parseFile1 = parse(file1, getFormat(filepath1));
  const parseFile2 = parse(file2, getFormat(filepath2));

  const infoGendiff = getDiffInformation(parseFile1, parseFile2);
  const result = infoGendiff.map((item) => {
    const itemType = item.type;
    switch (itemType) {
      case 'delited':
        return `  - ${item.key}: ${item.value}`;
      case 'nochanges':
        return `    ${item.key}: ${item.value}`;
      case 'changed':
        return `  - ${item.key}: ${item.valueFile1} \n  + ${item.key}: ${item.valueFile2} `;
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;
