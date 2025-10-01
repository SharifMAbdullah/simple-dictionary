window.addEventListener("load", (event) => {
  addCSS(
    ".wordMeaningContainer {display: block; top: 362.633px; left: 724.183px; position: fixed; background: rgb(247, 247, 196)}"
  );
});

document.addEventListener("mouseup", (e) => {
  const selection = document.getSelection();
  const selectedText = selection.toString();
  if (isSpaceInPhrase(selectedText)) {
    const wordMeaning = async (sourceText) => {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${sourceText}`
      );
      const result = await response.json();
      return result[0]["meanings"][0]["definitions"][0]["definition"];
    };
    wordMeaning(selectedText).then((result) => {
      addWordMeaningPopup(result);
    });
  }
});

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
  // if (!addWordMeaningPopup.firstRun) {
  //   addCSS(
  //     ".wordMeaningContainer {display: block; top: 362.633px; left: 724.183px; position: fixed; background: rgb(247, 247, 196)}"
  //   );
  // }
  const wordMeaningdiv = document.createElement("div");
  wordMeaningdiv.classList.add("wordMeaningContainer");
  wordMeaningdiv.innerHTML = meaning;
  document.body.appendChild(wordMeaningdiv);
}

const addCSS = (css) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);

// In dailystar, they add the popup as a div at the very end of the
// <body> like this:
{
  /* <div id="wordMeaningContainer" style="display: block; top: 362.633px; left: 724.183px; position: fixed; background: rgb(247, 247, 196);">
    <div id="wordMeaning"><h3>private</h3><p>A soldier of the lowest rank in the army.</p></div>
    <div id="crossIcon" style="display: block;">X</div>
</div>  */
}
// function showPopUp(e) {
//     e.preventDefault()
//     var popup = document.getElementById("resultPopUp");
//     popup.classList.toggle("show");
// }
