import getDiffInformation from '../gendiffInform.js';

const stylish = (parseFile1, parseFile2) => {
  const infoGendiff = getDiffInformation(parseFile1, parseFile2);
  const result = infoGendiff.map((item) => {
    const itemType = item.type;
    switch (itemType) {
      case 'nested':
        return `  * ${item.key}: ${item.value}`;
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
  return result;
};

export default stylish;
