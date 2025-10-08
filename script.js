// for keeping just one style tag for wordMeaningContainer in the current pag
window.addEventListener("load", (event) => {
  addCSS(
    ".wordMeaningContainer {display: block; z-index: 999; max-width: 500px; position: fixed; background: rgb(247, 247, 196)}"
  );
});
const addCSS = (css) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);


// start messaging between content and service worker
window.addEventListener("mouseup", sendMessage);

// handle message sent from background script
function handleResponse(message) {
  if (message.response === "on") {
    document.addEventListener("mouseup", mainBoss);
  } else {
    document.removeEventListener("mouseup", mainBoss);
  }
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

// notify the background service worker that something
// has been selected
function sendMessage(e) {
  const sending = chrome.runtime.sendMessage({
    content: "selected",
  });
  sending.then(handleResponse, handleError);
}

function mainBoss(e) {
  const selection = document.getSelection();
  const selectedText = selection.toString();
  if (isSpaceInPhrase(selectedText)) {
    const wordMeaning = async (sourceText) => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${sourceText}`
        );
        const result = await response.json();
        return result[0]["meanings"][0]["definitions"][0]["definition"];
      } catch (error) {
        return "<i>Couldn't find any meaning</i>";
      }
    };
    wordMeaning(selectedText).then((result) => {
      addWordMeaningPopup(result);
      adjustTopAndLeft(e);
      closePopUp()
    });
  }
}

function adjustTopAndLeft(e) {
  // for finding bounding box
  // use this to change the top and left of the wordMeaningContainer
  var clicked = findClickedWord(e.target.childNodes[0], e.clientX, e.clientY);
  if (clicked) {
    var start = clicked[1];
    var r = clicked[2];
    var original = document.getElementsByClassName("wordMeaningContainer")[0].style;
    var temp1 = r.top - 30;
    original.top = temp1.toString() + "px";
    original.left = r.left.toString() + "px";
  }
}

function isSpaceInPhrase(str) {
  if (str.trim().length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i++) {
    if (
      (str[i] == " " && str[i + 1] != " ") ||
      (str[i] == " " && str[i - 1] != " ")
    )
      return true;
  }
  return true;
}

function addWordMeaningPopup(meaning) {
  const isWordMeaningDivExists = document.getElementsByClassName(
    "wordMeaningContainer"
  )[0];
  if (isWordMeaningDivExists) {
    isWordMeaningDivExists.innerHTML = meaning;
  } else {
    const wordMeaningdiv = document.createElement("div");
    wordMeaningdiv.classList.add("wordMeaningContainer");
    wordMeaningdiv.innerHTML = meaning;
    document.body.appendChild(wordMeaningdiv);
  }
}

function findClickedWord(parentElt, x, y) {
  var range = document.createRange();
  var words = parentElt.textContent.split(" ");
  var start = 0;
  var end = 0;
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    end = start + word.length;
    range.setStart(parentElt, start);
    range.setEnd(parentElt, end);
    // not getBoundingClientRect as word could wrap
    var rects = range.getClientRects();
    var clickedRect = isClickInRects(rects);
    if (clickedRect) {
      return [word, start, clickedRect];
    }
    start = end + 1;
  }

  function isClickInRects(rects) {
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      if (r.left < x && r.right > x && r.top < y && r.bottom > y) {
        return r;
      }
    }
    return false;
  }
  return null;
}

function closePopUp() {
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      document.getElementsByClassName("wordMeaningContainer")[0].remove()
    }
  });
  };
