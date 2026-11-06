
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
let keywordA;
let keywordB;
let typeTimeout;
function displayScene(sceneData) {
  console.log('displaying scene:', sceneData);
  keywordA = sceneData.keywordA;
  keywordB = sceneData.keywordB;
  const textContainer = $('<div></div>').addClass('text-container');
  mainContainer.empty();
  textContainer.appendTo(mainContainer);

  // jam hack: assemble lines into single string with magic separator,
  // (this keeps iterating easy)
  // then re-add visual line breaks as we go
  // (this maintains the original line breaks visually)
  let fullText = '';
  sceneData.lines.forEach(line => {
    fullText += line;
    fullText += '%';
  });

  let kwAStart, kwBStart;
  function addNextChar() {
    if (i < fullText.length) {
      const c = fullText[i];

      if (c !== '%') {
        const charEl = $('<span></span>').addClass('char').text(c);
        if (isLetter(c)) {
          charEl.addClass('char-'+c);
        }
        if (fullText.slice(i, i+keywordA.length).toLowerCase() === keywordA) {
          console.log('KW A found at:', i);
          kwAStart = i;
        }
        if (keywordB && fullText.slice(i, i+keywordB.length).toLowerCase() === keywordB) {
          console.log('KW B found at:', i);
          kwBStart = i;
        }
        if (kwAStart && i<kwAStart+keywordA.length) {
          charEl.addClass('keyword');
        }
        if (kwBStart && i<kwBStart+keywordB.length) {
          charEl.addClass('keyword alt');
        }
        charEl.appendTo(textContainer);
      } else {
        // magic line break
        $('<div>').addClass('spacer').appendTo(textContainer);
      }

      i++;
      // TODO: increase timeout for . characters for better flow.
      typeTimeout = setTimeout(addNextChar, constants.CHAR_TIMEOUT);
    } else {
      console.log('finished line.');
      // TODO: disable typing until line finished
      clearTimeout(typeTimeout);
    }
  }

  addNextChar();
}

let currentlyTypedWord = '';
function processInput(char) {
  console.assert(isLetter(char));

  // remove any previous highlight - unless it started a keyword
  $('.char').not('.keyword').removeClass('active');

  currentlyTypedWord += char;
  if (keywordA.startsWith(currentlyTypedWord) || (keywordB && keywordB.startsWith(currentlyTypedWord))) {
    // continued word: highlight can stay, check for full trigger
    if (keywordA === currentlyTypedWord) {
      console.log('===> keywordA hit');
      // TODO: play animation
      // TODO: change scenes
    }
    if (keywordB === currentlyTypedWord) {
      console.log('===> keywordB hit');
      // TODO: play animation
      // TODO: change scenes
    }
  } else {
    // start new word: highlight has to go
    $('.char').removeClass('active');
    currentlyTypedWord = char;
  }

  // highlight newly typed char
  const classQuery = '.char-' + char;
  $(classQuery).each(function() {
    const el = $(this);
    el.addClass('active');
  });
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
