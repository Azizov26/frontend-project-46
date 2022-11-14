import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getAbsolutFilePath = (filepath) => path.resolve(process.cwd(), '_fixtures_', filepath);
// находит путь, относительный и абсолютный

const readFile = (filepath) => fs.readFileSync(getAbsolutFilePath(filepath), 'utf8');
// читает файл

const parsesFile = (file) => JSON.parse(file);
// распарсить файл с джейсона на обычный объект

const getDiffInformation = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // забираем ключи
  const keys = _.sortBy(_.union([...keys1, ...keys2]));
  // сортируем по алфавитному порядку по уникальным значениям
  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    // у ключей берем значения
    if (_.isEqual(value1, value2)) {
      // проверка на эквивалетность . то что одинаковые данные
      return {
        type: 'nochanges', // тип - без измений
        key,
        value: value1,
      };
    }
    if (value1 && value2 && value1 !== value2) {
      // тип измненен
      return {
        type: 'changed',
        key,
        value1,
        value2,
      };
    }
    if (!_.has(obj2, key)) {
      // удалить , так как нет ключа во втором объекте
      return {
        type: 'delited',
        key,
        value: value1,
      };
    }
    if (!_.has(obj1, key)) {
      // добавить так как ессть только один ключ похожих нет
      return {
        type: 'added',
        key,
        value: value2,
      };
    }
    return null;
  });

  return result;
};

const gendiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const informationDiff = getDiffInformation(parsesFile(file1), parsesFile(file2));
  // console.log(informationDiff);
  const result = informationDiff.map((diff) => {
    const diffType = diff.type;
    switch (diffType) {
      case 'delited':
        return `  - ${diff.key}: ${diff.value}`;
      case 'nochanges':
        return `    ${diff.key}: ${diff.value}`;
      case 'changed':
        return `  - ${diff.key}: ${diff.value1} \n  + ${diff.key}: ${diff.value2}`;
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      default:
        return null;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default gendiff;
