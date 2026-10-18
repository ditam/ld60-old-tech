import constants from './constants.js';

let _id_counter = 0;

const utils = {
  arraysEqual: function(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  },

  clamp: function(num, min, max) {
    return Math.min(Math.max(num, min), max);
  },

  deepCopy: function(o) {
    return JSON.parse(JSON.stringify(o));
  },

  getNewID: function() {
    _id_counter++;
    return 'id_' + _id_counter;
  },

  getRandomInt: function(min, max) { // min and max included
    if (typeof max === 'undefined') {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getRandomItem: function (array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  removeItem: function (array, item) {
    const i = array.indexOf(item);
    console.assert(i > -1, 'Remove target object not found in array', item);
    array.splice(i, 1);
  },

  sum: function(array) {
    return array.reduce((partialSum, a) => partialSum + a, 0);
  }
}

export default utils;