const wordList = [
  {
    word: "fish",
    hint: "live in the water",
  },
  {
    word: "pizza",
    hint: "round food",
  },
  {
    word: "Bananaa",
    hint: "Fruit We eat it",
  },
  {
    word: "mouth",
    hint: "we eat in it",
  },
  {
    word: "mobile",
    hint: "we call between us in it ",
  },
  {
    word: "maradona",
    hint: "player in Argentinia his level in the top ",
  },
  {
    word: "crazy",
    hint: "SomeOne behaive in a strange .",
  },
  {
    word: "laptop",
    hint: "carry it in the bag with us",
  },
  {
    word: "sleep",
    hint: "anti-sleep",
  },
  {
    word: "white",
    hint: "opposite black",
  },
  {
    word: "cat",
    hint: "yell meow",
  },
  {
    word: "bird",
    hint: "flying in the air",
  },
  {
    word: "mind",
    hint: "something that distinguishes humans from other living things",
  },
  {
    word: "cow",
    hint: "pet animal",
  },
  {
    word: "hand",
    hint: "catch the things by it ",
  },
  {
    word: "iraq",
    hint: "country in Asia",
  },
  {
    word: "makron",
    hint: "president of one of the country in Europe",
  },
  {
    word: "pencil",
    hint: "write in it ",
  },
];

const containerDiv = document.querySelector(".container");
const resetBtn = document.querySelector(".reset");
const hintSpan = document.querySelector(".hint span");
const inputs = document.querySelector(".inputs");
const inputsChild = document.querySelector(".inputs input");
const typingGuess = document.querySelector(".typing-guess");
const wrongSpan = document.querySelector(".wrong span");
const remainSpan = document.querySelector(".remain span");
const successDiv = document.querySelector(".success");
const successBtn = document.querySelector(".success-btn");
const pointDiv = document.querySelector(".points");
const pointBtn = document.querySelector(".point-btn");
const failedDiv = document.querySelector(".failed");
const failedBtn = document.querySelector(".failed-btn");
const audioFail = document.querySelector(".fail");
const audioFullFail = document.querySelector(".full-fail");
const audioSuccess = document.querySelector(".success");
const audioFullSuccess = document.querySelector(".full-success");
const series = document.querySelector(".series");
const pointCount = document.querySelector(".point-count");

let word;
let pointNum = 0 ;
let widthCount = 0;
let uncorrectLetter = [];
let correctLetter = [];
let maxRemain;

function randomWord() {
  let randObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randObj.word;
  let hint = randObj.hint;
  hintSpan.textContent = hint;
  let inputText = "";
  for (let i = 0; i < word.length; i++) {
    inputText += `
        <input type="text" disabled>
        `;
  }
  maxRemain = 10;
  uncorrectLetter = [];
  correctLetter = [];
  inputs.innerHTML = inputText;
  wrongSpan.textContent = "";
  remainSpan.textContent= maxRemain;

  let mainPoint = localStorage.getItem("pointCount");
  if(mainPoint !== null){

    pointCount.innerHTML = `${mainPoint}`;
  }else{
    pointCount.innerHTML = `0`;
  }
  typingGuess.focus();
}
randomWord();

function guessWord(e) {
  let key = e.target.value;
  if (key.match(/^[A-Za-z]+$/) && !uncorrectLetter.includes(key) && !correctLetter.includes(key)) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
            correctLetter.push(key);
          inputs.querySelectorAll("input")[i].value = key;
          // audioSuccess.play();
        }
      }
    } else {
      // audioFail.play();
      maxRemain--;
      uncorrectLetter.push(key);
      wrongSpan.textContent += `${key},`;
      remainSpan.textContent= maxRemain;

    

    }
  }
  if(correctLetter.length === word.length){
    successDiv.style.display = "flex";
    // audioFullSuccess.play();
    

  } else if(maxRemain < 1){
    failedDiv.style.display = "flex";
  }
  

  typingGuess.value = "";
}

function removeSuccess(){
  successDiv.style.display = "none";
  setTimeout(() => {
    widthCount = widthCount + 5 ;
    series.style.width = `${widthCount}%` ;
    series.style.opacity = 1;

    if(widthCount === 100){
      pointDiv.style.display = "flex";
    }
        // audioFullFail.play();
        // for (let i = 0; i < word.length; i++) {
        //         inputs.querySelectorAll("input")[i].value = word[i];
              
        // }
    }
, 1000);
  randomWord();
}
function removepoint(){
  pointDiv.style.display = "none";
  randomWord();
  widthCount = 0 ;
  series.style.width = `${widthCount}%` ;
  series.style.opacity = 0;
  pointNum++;
  pointCount.innerHTML = `${pointNum}`;
  localStorage.setItem("pointCount", pointNum);
}
function removeFailed(){
  failedDiv.style.display = "none";
  randomWord();
}

function focusTyping(){
  typingGuess.focus();
}



resetBtn.addEventListener("click", randomWord);
typingGuess.addEventListener("input", guessWord);
successBtn.addEventListener("click", removeSuccess);
pointBtn.addEventListener("click", removepoint);
failedBtn.addEventListener("click", removeFailed);
containerDiv.addEventListener("click", focusTyping);
