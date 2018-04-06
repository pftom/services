const _ = require('underscore');

const arr1 = [
  {
    a: 1,
    b: 2,
  },
  {
    a: 2,
    b: 3,
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

const res = _.difference(arr1, arr2);
console.log(res);