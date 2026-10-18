
import constants from './constants.js';
import utils from './utils.js';
import scenes from './scenes.js';

window.isDebug = location && location.hostname==='localhost';

function isLetter(char) {
  const s = char.toLowerCase();
  if (s >= 'a' && s <= 'z') {
    return true;
  }
  return false;
}

let i = 0;
let keyword;
let typeTimeout;
function displayScene(sceneData) {
  console.log('displaying scene:', sceneData);
  keyword = sceneData.keyword;
  const line = $('<div></div>').addClass('line');
  mainContainer.empty();
  line.appendTo(mainContainer);

  const text = sceneData.lines[0];
  function addNextChar() {
    if (i < text.length) {
      const c = text[i];
      const charEl = $('<span></span>').addClass('char').text(c);
      if (isLetter(c)) {
        charEl.addClass('char-'+c);
      }
      charEl.appendTo(line);
      i++;
      typeTimeout = setTimeout(addNextChar, constants.CHAR_TIMEOUT);
    } else {
      console.log('finished line.');
      clearTimeout(typeTimeout);
    }
  }

  addNextChar();
}

function processInput(char) {
  console.assert(isLetter(char));
  console.log('input: ', char);
  const classQuery = '.char-' + char;
  $('.char').removeClass('green', 'red');
  $(classQuery).addClass('green');
}

let mainContainer;
$(document).ready(function() {
  console.log('-- init --');

  mainContainer = $('#main-container');
  const sceneData = scenes.getCurrentSceneData();
  displayScene(sceneData);

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key.length !== 1) {
      // Some keys are full words like Shift or Enter
      return;
    } else {
      // Only letters are valid input
      if (isLetter(key)) {
        processInput(key);
      }
    }
  });
});
