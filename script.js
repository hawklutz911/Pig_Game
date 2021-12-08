"use strict";
//Selecting the properties

const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");
const scoreEl1 = document.querySelector("#score--1");
const scoreEl0 = document.getElementById("score--0");
const currentEl0 = document.querySelector("#current--0");
const currentEl1 = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, isPlaying, activePlayer;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceEl.classList.add("hidden");
  playerEl0.classList.remove("player--winner");
  playerEl1.classList.remove("player--winner");
  playerEl0.classList.add("player--active");
  playerEl1.classList.remove("player--active");
};
init();

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      isPlaying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener("click", init);
