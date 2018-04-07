const _ = require('lodash');

const arr1 = [
  {
    a: 1,
    b: 2,
  },
  {
    a: 2,
    b: 4,
  },
];

const arr2 = [
  {
    a: 1,
    b: 2,
  },
  {
    a: 2,
    b: 4,
  },
];

const res = _.difference([], []);
console.log(res);