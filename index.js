"use strict";

const allButtons = [...document.querySelectorAll("button")];
const classListSelected = "selected";
const main = document.querySelector(".root");
let selectedButton;
let reqIndex;
let arrayInBrowser, arrInJs;
let i = 0;
let j = 0;
let getIndexesElements = true;
let changeColorsAndValues = false;
let isSorting = false;
const messageArrayIsSorted = "Array is sorted!";
const textContentButton = [
  "Every iteration by click",
  "1s delay iteration WO click",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomArray(size) {
  let arrInJs = [];
  let arrayInBrowser = document.createElement("div");
  arrayInBrowser.style.marginTop = "30px";
  arrayInBrowser.id = "arrayInBrowser";

  let openingBracket = document.createTextNode("[");
  arrayInBrowser.appendChild(openingBracket);

  for (let i = 0; i < size; ++i) {
    let randNum = getRandomInt(1, 100);
    arrInJs.push(randNum);
    let arrayElement = document.createElement("span");
    arrayElement.id = `element-${i}`;
    arrayElement.textContent = randNum;
    arrayInBrowser.appendChild(arrayElement);

    if (i !== size - 1) {
      let comma = document.createTextNode(", ");
      arrayInBrowser.appendChild(comma);
    }
  }

  let closingBracket = document.createTextNode("]");
  arrayInBrowser.appendChild(closingBracket);

  return [arrayInBrowser, arrInJs];
}

function isSorted(arr) {
  return arr.every((num, index) => {
    return index === arr.length - 1 || num <= arr[index + 1];
  });
}

function bubbleSort(arr) {
  let temp;
  let i = 0;
  let j = 0;
  let n = arr.length;
  let swapped = false;
  getIndexesElements = true;
  changeColorsAndValues = false;

  while (i < n - 1) {
    swapped = false;
    while (j < n - i - 1) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        return;
      }
      ++j;
    }
    if (!swapped) break;
    ++i;
    j = 0;
  }
}

function getIndexesOfSwappedElements(arr) {
  let swapped = false;
  let i = 0;
  let j = 0;
  let n = arr.length;
  getIndexesElements = false;
  changeColorsAndValues = true;

  while (i < n - 1) {
    swapped = false;
    while (j < n - i - 1) {
      if (arr[j] > arr[j + 1]) {
        swapped = true;
        return [j, j + 1];
      }
      ++j;
    }
    if (!swapped) break;
    ++i;
    j = 0;
  }
}

function printMessageArrayIsSorted() {
  let placeToBeInserted = document.getElementById("arrayInBrowser");
  const ArrayIsSorted = document.createElement("p");
  ArrayIsSorted.id = "ArrayIsSorted";
  ArrayIsSorted.textContent = messageArrayIsSorted;
  placeToBeInserted.insertAdjacentHTML(
    "beforeend",
    `<br>${ArrayIsSorted.outerHTML}`
  );
  const allElements = document.querySelectorAll("#arrayInBrowser span");

  allElements.forEach((element) => {
    element.classList.remove("swapped");
    element.classList.remove("highlight");
  });

  if (document.getElementById("nextIterationBtn")) {
    document.getElementById("nextIterationBtn").textContent =
      "Reload page";
    document
      .getElementById("nextIterationBtn")
      .addEventListener("click", () => location.reload());
  } else {
    document.getElementById("beginSortBtn").textContent = "Reload page";
    document
      .getElementById("beginSortBtn")
      .addEventListener("click", () => location.reload());
  }
  return console.log("Array is sorted.");
}

function changeColorOfElementsInBrowser(arrSize) {
  let swappedElements = [];
  swappedElements = getIndexesOfSwappedElements(arrInJs, i, j, arrSize);
  const allElements = document.querySelectorAll("#arrayInBrowser span");
  allElements.forEach((element, i) => {
    element.classList.remove("swapped");
    element.classList.remove("highlight");
    if (i === swappedElements[0]) {
      element.classList.add("swapped");
    } else if (i === swappedElements[1]) {
      element.classList.add("highlight");
    }
  });
}

function swapElementsInBrowser(arrSize) {
  let swappedElements = [];
  swappedElements = getIndexesOfSwappedElements(arrInJs, i, j, arrSize);
  let firstItemToReplace = swappedElements[0];
  let secondItemToReplace = swappedElements[1];
  const allElements = document.querySelectorAll("#arrayInBrowser span");

  allElements.forEach((element, i) => {
    if (i === firstItemToReplace) {
      element.textContent = arrInJs[secondItemToReplace];
      element.classList.add("swapped");
    } else if (i === secondItemToReplace) {
      element.textContent = arrInJs[firstItemToReplace];
      element.classList.add("highlight");
    }

    // BubbleSort 1 iteration
    if (i === arrSize - 1) {
      bubbleSort(arrInJs);
    }
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sortWithDelay() {
  let n = arrInJs.length;
  let i = 0;

  while (!isSorted(arrInJs)) {
    if (getIndexesElements) {
      changeColorOfElementsInBrowser(n);
    }
    await delay(1000);

    if (changeColorsAndValues) {
      swapElementsInBrowser(n);
    }
    await delay(1000);

    i++;
  }

  if (isSorted(arrInJs) && !document.getElementById("ArrayIsSorted")) {
    isSorting = false;
    document.getElementById("generateArr").disabled = false;
    document.getElementById("generateArr").style.cursor = "pointer";
    printMessageArrayIsSorted();
  }
}

allButtons.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    // Delete all buttons except selected
    if (
      !allButtons.some((btn) => btn.classList.contains(classListSelected))
    ) {
      reqIndex = index;
      selectedButton = e.target;
      selectedButton.classList.add(classListSelected);
    }
    // Add animation for deleted buttons
    allButtons.forEach((a, i) => {
      if (!a.classList.contains(classListSelected)) {
        a.classList.add("fade-out");
        setTimeout(() => {
          a.remove();
          allButtons.splice(i, 1);
        }, 200);
      }
    });

    if (!document.getElementById("inputArrSize")) {
      // Input for array size
      const inputArrSize = document.createElement("input");
      main.appendChild(inputArrSize);
      inputArrSize.placeholder = "Input size of array 1 <= n <= 15";
      inputArrSize.type = "number";
      inputArrSize.id = "inputArrSize";

      // Generate random array button
      const generateArr = document.createElement("button");
      generateArr.textContent = "Generate random array";
      generateArr.type = "button";
      generateArr.id = "generateArr";
      generateArr.style.opacity = 0;
      main.appendChild(generateArr);

      // Add animation
      setTimeout(() => {
        inputArrSize.classList.add("fade-in");
        generateArr.classList.add("fade-in");
      }, 300);
    }

    // Generate buttons depending on chosen variant to sort
    document
      .getElementById("generateArr")
      .addEventListener("click", (e) => {
        let arrSize = parseInt(inputArrSize.value);
        const nextIterationBtn = document.createElement("button");
        const delayBtn = document.createElement("button");
        if (selectedButton.id == "iterClick") {
          nextIterationBtn.classList.add("fade-in");
          nextIterationBtn.textContent = "Next iteration";
          nextIterationBtn.id = "nextIterationBtn";
        } else if (selectedButton.id == "iterDelay") {
          delayBtn.classList.add("fade-in");
          delayBtn.textContent = "Begin sort";
          delayBtn.id = "beginSortBtn";
        }

        // Check arrSize input and generate random array in browser
        if (!isNaN(arrSize) && arrSize !== 0) {
          if (document.getElementById("arrayInBrowser")) {
            document.getElementById("arrayInBrowser").remove();
            if (selectedButton.id == "iterClick") {
              document.getElementById("nextIterationBtn").remove();
            } else if (selectedButton.id == "iterDelay") {
              document.getElementById("beginSortBtn").remove();
            }
            [arrayInBrowser, arrInJs] = generateRandomArray(arrSize);
          } else {
            [arrayInBrowser, arrInJs] = generateRandomArray(arrSize);
          }
        }

        // Add buttons depending on chosen variant to sort in browser
        main.appendChild(arrayInBrowser);
        if (selectedButton.id === "iterClick") {
          main.appendChild(nextIterationBtn);
        } else if (selectedButton.id === "iterDelay") {
          main.appendChild(delayBtn);
        }
      });
  });
});

// Sort by click
main.addEventListener("click", (e) => {
  if (e.target.id === "nextIterationBtn") {
    // Message for sorted array
    if (isSorted(arrInJs) && !document.getElementById("ArrayIsSorted")) {
      printMessageArrayIsSorted();
    }

    // Change color for swapped elements in browser
    let n = arrInJs.length;
    if (i < n - 1 && !isSorted(arrInJs)) {
      if (getIndexesElements) {
        changeColorOfElementsInBrowser(n);
      }
      // Swap 2 elements in browser
      else if (changeColorsAndValues) {
        swapElementsInBrowser(n);
      }
    }
    // Sort with delay
  } else if (e.target.id === "beginSortBtn") {
    if (!isSorting) {
      const button = document.getElementById("generateArr");
      isSorting = true;
      button.style.cursor = "progress";
      button.disabled = true;
      sortWithDelay();
    }
  }
});
