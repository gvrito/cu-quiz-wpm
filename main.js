const DUMMY_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique aliquam ante, nec laoreet massa finibus vel. Pellentesque ut quam eget sapien venenatis fringilla at ut urna. Aenean volutpat orci diam, at blandit lectus pretium in. Etiam viverra orci nisi, ut interdum erat efficitur non. Fusce tempus faucibus nisi a consectetur. Cras venenatis turpis arcu, vel euismod eros auctor vestibulum. Duis imperdiet sem sit amet neque fringilla, id blandit nisi mattis. Ut molestie porta accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ac tempus dolor, vitae vestibulum purus. Pellentesque blandit elit ex, sollicitudin interdum nisi bibendum nec. Aliquam at justo ut eros aliquam iaculis. Vestibulum porttitor tincidunt risus sit amet sollicitudin";

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
