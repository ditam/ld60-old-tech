import utils from './utils.js';

let currentSceneIndex = 0;

const _scenes = [
  {
    type: 'convo',
    icon: 'icon0.png',
    lines: [
      'So who\'s the suspect?',
      'A golem',
      'Oh shit... How old?',
      'First gen.',
      'Wow, how is he still running?',
      'I think he\'s rather walking, heh. He rations his uptime. Stays offline.',
      'Okay. Did you send me the trace?',
      'Yep, you have it.',
      'Then I better start.',
    ],
    keywordA: 'start',
    //keywordB: 'world'
  },
  {
    type: 'A',
    icon: 'icon1.png',
    lines: [
      'I hate dealing with golems.',
      'They can barely string two sentences together,',
      'but in one of those they will claim they are better than you...',
      'This one hopped a freighter south. Ugh.',
      'I wonder what he\'s up to...',
      'I can catch up to him in a couple hours.',
    ],
    keywordA: 'catch',
    // keywordB: 'two'
  },
  {
    type: 'B',
    icon: 'icon2.png',
    lines: [
      'Freedom. A road trip like it\'s 2035.',
      'I should have a couple hours until he gets here.',
      'I\'ll analyze... nay, smell the air there.',
      'Take it in and wait for the inevitable.',
    ],
    keywordA: 'notExisting',
    //keywordB: 'two'
  }
];

// TODO: assert structure
// - mandatory fields present
// - assert keyword contained in lines
// - keywords are lower case
// - assert only one occurence per keyword

export default {
  getCurrentSceneData: function() {
    return utils.deepCopy(_scenes[currentSceneIndex]);
  },
  changeScene: function() {
    // TODO: take target scene as param
    currentSceneIndex++;
  },
};
