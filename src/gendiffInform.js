import _ from 'lodash';

const getDiffInformation = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const FileKeys = _.sortBy(_.union([...keys1, ...keys2]));

  const result = FileKeys.map((key) => {
    const valueFile1 = file1[key];
    const valueFile2 = file2[key];

    // if (_.isPlainObject(valueFile1)) {
    //   return {
    //     type: 'nested',
    //     key,
    //     value: getDiffInformation(valueFile1, valueFile2),
    //   };
    // }

    if (_.isEqual(valueFile1, valueFile2)) {
      return {
        type: 'nochanges',
        key,
        value: valueFile1,
      };
    }
    if (valueFile1 && valueFile2 && valueFile1 !== valueFile2) {
      return {
        type: 'changed',
        key,
        valueFile1,
        valueFile2,
      };
    }
    if (!_.has(file2, key)) {
      return {
        type: 'delited',
        key,
        value: valueFile1,
      };
    }
    if (!_.has(file1, key)) {
      return {
        type: 'added',
        key,
        value: valueFile2,
      };
    }
    return null;
  });

  return result;
};
export default getDiffInformation;
