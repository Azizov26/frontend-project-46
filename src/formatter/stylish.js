import _ from 'lodash';

const genIndent = (depth, str = ' ', spacesCount = 4) => str.repeat(depth * spacesCount - 2);

const makeString = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKey = value[key];
    return `${genIndent(depth + 1)}  ${key}: ${makeString(newKey, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${genIndent(depth)}}`;
};

const stylish = (data) => {
  const iter = (node, depth = 1) => {
    const result = node.map((item) => {
      switch (item.type) {
        case 'nested': {
          return `${genIndent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1)}\n${genIndent(depth)}  }`;
        }
        case 'delited':
          return `${genIndent(depth)}- ${item.key}: ${makeString(item.value, depth)}`;
        case 'added':
          return `${genIndent(depth)}+ ${item.key}: ${makeString(item.value, depth)}`;
        case 'changed':
          return `${genIndent(depth)}- ${item.key}: ${makeString(item.value1, depth)}\n${genIndent(depth)}+ ${
            item.key
          }: ${makeString(item.value2, depth)}`;
        case 'unchanged':
          return `${genIndent(depth)}  ${item.key}: ${makeString(item.value, depth)}`;
        default:
          throw new Error(`Unknown type ${item.type}`);
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(data)}\n}`;
};
export default stylish;
