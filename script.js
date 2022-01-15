/* *******************************************************************
                Helper Functions
******************************************************************** */
const pickColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateRandomColors = (number) => {
  const output = [];
  for (let i = 0; i < number; i++) {
    output.push(generateRandomColor());
  }
  return output;
};

const changeColors = (color) => {
  for (let i = 0; i < colors.length; i++) {
    boxes[i].style.backgroundColor = color;
  }
};

const reset = () => {
  colors = generateRandomColors(numBoxes);
  pickedColor = pickColor();
  colorCode.textContent = "Find " + pickedColor;
  gameStatus.textContent = "";
  title.style.backgroundColor = "steelblue";
  resetBtn.textContent = "Reset";
  for (let i = 0; i < boxes.length; i++) {
    if (colors[i]) {
      boxes[i].style.backgroundColor = colors[i];
    } else {
      boxes[i].style.backgroundColor = "#000";
    }
  }
};

/* *******************************************************************
                Init Variables
******************************************************************** */

// State
let numBoxes = 6;
let colors = generateRandomColors(numBoxes);
let pickedColor = pickColor();

// Select elements
const boxes = document.querySelectorAll(".box");
const colorCode = document.querySelector("#color-code");
const gameStatus = document.querySelector("#game-status");
const title = document.querySelector("h1");
const resetBtn = document.querySelector("#reset");
const modeBtns = document.querySelectorAll(".mode");

/* *******************************************************************
 ******************************************************************** */

// Setting colorCode display
colorCode.textContent = "Find " + pickedColor;

// mode buttons
modeBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    modeBtns[0].classList.remove("selected");
    modeBtns[1].classList.remove("selected");
    modeBtns[2].classList.remove("selected");
    this.classList.add("selected");

    if (this.textContent === "Easy") {
      numBoxes = 3;
    } else if (this.textContent === "Medium") {
      numBoxes = 6;
    } else {
      numBoxes = 9;
    }

    reset();
  });
});

// reset button
resetBtn.addEventListener("click", reset);

// Set up boxes
for (let i = 0; i < boxes.length; i++) {
  boxes[i].style.backgroundColor = colors[i];
  boxes[i].addEventListener("click", function () {
    if (pickedColor === this.style.backgroundColor) {
      gameStatus.textContent = "You Win!";
      changeColors(pickedColor);
      resetBtn.textContent = "Play again?";
      title.style.backgroundColor = pickedColor;
    } else {
      this.style.backgroundColor = "#000";
      gameStatus.textContent = "Try again!";
    }
  });
}
