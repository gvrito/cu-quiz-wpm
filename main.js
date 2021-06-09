const DUMMY_TEXT =
`push yourself, because no one else is going to do it for you failure is the condiment that gives success its flavor wake up with determination go to bed with satisfaction it's going to be hard, but hard does not mean impossible learning never exhausts the mind the only way to do great work is to love what you do wake up with determination go to bed with satisfaction it's going to be hard you are the shuckiest shuck faced shuck in the world that proves you are unusual and I am convinced that the only people worthy of consideration in this world are the unusual ones for the common folks are like the leaves of a tree and live and die unnoticed`

// all the constants.
const TIME_SPAN = document.getElementById("time");
const TIME_WRAPPER = document.getElementById("time-wrapper");
const INPUT = document.getElementById("input");
const TEXT = document.getElementById("text");
const RESULTS = document.getElementById("results");
const RESULTS_SPAN = document.getElementById("result-span");

// game config
const GAME_DURATION = 60000;

function startGame() {
  let currSecond = GAME_DURATION / 1000;
  TIME_WRAPPER.style.display = "block";
  TIME_SPAN.innerText = currSecond;
  const interval = setInterval(() => {
    changeColorOfTime(currSecond);
    currSecond--;
    TIME_SPAN.innerText = currSecond;

    if (currSecond === 0) {
      clearInterval(interval);
      INPUT.value = "";
      INPUT.setAttribute("disabled", true);
      displayResults();
      return;
    }
  }, 1000);
}

function main() {
  initText();
  INPUT.addEventListener("keyup", startGame, { once: true });
  INPUT.addEventListener("keyup", (e) => {
    if (e.key === " " || e.key === "Backspace") {
      checkForProgrss();
    }
  });
}

// helper functions
function changeColorOfTime(currentSecond) {
  switch (currentSecond) {
    case 60:
      TIME_WRAPPER.classList.add("green");
      break;
    case 40:
      TIME_WRAPPER.classList.add("orange");
      TIME_WRAPPER.classList.remove("green");
      break;
    case 20:
      TIME_WRAPPER.classList.remove("orange");
      TIME_WRAPPER.classList.add("red");
      break;
  }
}

function initText() {
  for (const word of DUMMY_TEXT.split(" ")) {
    const span = document.createElement("span");
    span.innerText = word;

    const space = document.createElement("span");
    space.innerText = " ";

    // TEXT.appendChild(span);
    TEXT.appendChild(span);
    TEXT.appendChild(space);
  }
}

function checkForProgrss() {
  const inputValue = INPUT.value;

  // we skipping spacebars.
  const spansOfIriginalText = Array.from(TEXT.getElementsByTagName("span")).filter(
    (span) => span.innerText !== " "
  );

  const typedWordsArray = inputValue.trim().split(" ");
  const originalTextsArray = DUMMY_TEXT.split(" ");

  const typedWordsCount = typedWordsArray.length;

  for (let i = 0; i < typedWordsCount; i++) {
    if (typedWordsArray[i] === originalTextsArray[i]) {
      spansOfIriginalText[i].classList.add("green");
      spansOfIriginalText[i].classList.remove("red");
    } else {
      spansOfIriginalText[i].classList.add("red");
      spansOfIriginalText[i].classList.remove("green");
    }
  }
}

function displayResults() {
  const correctWords = TEXT.getElementsByClassName("green").length;
  RESULTS_SPAN.innerText = correctWords;
  RESULTS.style.display = "flex";
}

// maian
main();
