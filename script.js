let gridRows = 70;
let gridColumns = 130;
let squareDim = 10;
let color = "green";
let isRainbow = false
let colors = ["green", "blue", "red", "purple", "pink", "black", "yellow", "orange", "gray", "indigo"];

const gridContainer = document.createElement("div");
gridContainer.id = "grid-container";

const clearGrid = () => {
  const numberOfSquares = gridColumns * gridRows;
  for (let i = 0; i < numberOfSquares; i++) {
    document.querySelector(`.square-${i+1}`).style.backgroundColor = "white";
  }
};


const deleteGrid = () => {
  const numberOfSquares = gridColumns * gridRows;
  for (let i = 0; i < numberOfSquares; i++) {
    const toDelete = document.querySelector(`.square-${i+1}`);
    gridContainer.removeChild(toDelete);
  }
};


function buildGrid() {
  gridContainer.style.cssText = (`
    display: flex;
    flex-wrap: wrap;
    width: ${gridColumns*squareDim}px;
    height: ${gridRows*squareDim}px;
    padding: 0;
    margin: 0;
    border: 3px solid black;
  `);

  for (let i = 0; i < gridRows*gridColumns; i++) {
    const square = document.createElement("div");
    square.classList.add(`square-${i+1}`);
    square.style.cssText = `flex: 1 1 auto; width: ${squareDim}px; height: ${squareDim}px; background-color: white;`;
    square.addEventListener("mouseenter", (e) => {
      if (isRainbow) {
        const index = Math.floor(Math.random() * colors.length);
        color = colors[index];
      }
      e.target.style.backgroundColor = color;
    });
    gridContainer.appendChild(square);
  }

  document.querySelector("body").appendChild(gridContainer);
}

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("btn-container");

const dimButton = document.createElement("button");
dimButton.classList.add("btn");
dimButton.textContent = "Change Dimensions";
dimButton.addEventListener("click", () => {
  deleteGrid();
  gridRows = parseInt(prompt("Enter the number of rows:"));
  gridColumns = parseInt(prompt("Enter the number of columns:"));
  squareDim = parseInt(prompt("Enter the square dimensions (e.g. side length)"));
  buildGrid();
})

const clearButton = document.createElement("button");
clearButton.classList.add("btn");
clearButton.textContent = "Clear Board";
clearButton.addEventListener("click", () => {
  clearGrid();
});

const colorButton = document.createElement("button");
colorButton.classList.add("btn");
colorButton.textContent = "Change Color";
colorButton.addEventListener("click", () => {
  color = prompt("Type in a color:");
});

const rainbowButton = document.createElement("button");
rainbowButton.classList.add("btn");
rainbowButton.textContent = "Rainbow";
rainbowButton.addEventListener("click", () => {
  if (isRainbow) {
    isRainbow = false;
    rainbowButton.textContent = "Rainbow"
    color = "green";
  } else {
    isRainbow = true;
    rainbowButton.textContent = "Normal";
  }
});

buttonContainer.appendChild(dimButton);
buttonContainer.appendChild(colorButton);
buttonContainer.appendChild(rainbowButton);
buttonContainer.appendChild(clearButton)

document.querySelector("body").appendChild(buttonContainer);

buildGrid();