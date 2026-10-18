import utils from './utils.js';

let currentSceneIndex = 0;

const _scenes = [
  {
    lines: [
      'Hello World Asdf More stuff other a and b stuffies. Wonderful.',
      'Hello to you too...',
      'Third line!'
    ],
    keyword: 'stuff'
  }
];

// TODO: assert structure

export default {
  getCurrentSceneData: function() {
    return utils.deepCopy(_scenes[currentSceneIndex]);
  }
};
