document.addEventListener("mouseup", (e) => {
    const selection = document.getSelection();
    const selectedText = selection.toString();
    if (isSpaceInPhrase(selectedText)) {
        const wordMeaning = async (targetText) => {
            const response = await fetch(
              `https://api.dictionaryapi.dev/api/v2/entries/en/${targetText}`
            );
            const result = await response.json();
            return result;
        };
        wordMeaning(selectedText).then((result) => {
            console.log(result)
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