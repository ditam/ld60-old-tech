import utils from './utils.js';

let currentSceneIndex = 0;

const _scenes = [
  {
    lines: [
      'First line',
      'Hello World Asdf More stuff other a and b stufies. Wonderful.',
      'Hello to you too...',
      'Third line!'
    ],
    keyword: 'stuff'
  }
];

// TODO: assert structure
// - mandatory fields present
// - assert keyword contained in lines
// - assert only one occurence per keyword

export default {
  getCurrentSceneData: function() {
    return utils.deepCopy(_scenes[currentSceneIndex]);
  }
};
