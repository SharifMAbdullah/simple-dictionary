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
            console.log(result)
            document.getElementById("popup").innerText = result
            // window.location.href = "result_page.html"
            // const wordMeaning = localStorage.getItem("meaning");
            // document.getElementById("displayWord").innerText = wordMeaning;
            document.getElementById("resultPopUp").innerText = result;
        })
    }
});

function isSpaceInPhrase(str) {
    if (str.trim().length === 0){
        return false;
    }

    for (let i = 0; i < str.length; i++){
        if ((str[i] == " " && str[i + 1] != " ") ||
            (str[i] == " " && str[i - 1] != " "))
            return true;
    }
    return true;
}

function showPopUp(e) {
    e.preventDefault()
    var popup = document.getElementById("resultPopUp");
    popup.classList.toggle("show");
}

