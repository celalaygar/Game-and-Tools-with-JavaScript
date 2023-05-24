const numbers = document.querySelectorAll(".numbers");
const result = document.getElementById("spanResult");
const signs = document.querySelectorAll(".sign");
const equals = document.getElementsByClassName("equals");
const clear = document.querySelectorAll(".clear");
const negative = document.querySelectorAll(".negative");
const percent = document.querySelectorAll(".percent");
let firstValue = "0";
let secondValue = "";
let isFirstValue = false;
let isSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
    numbers[i].addEventListener("click", (e) => {
        // let atr = e.target.getAttribute("value");
        let atr = e.target.textContent;
        console.log(atr);
        if (isFirstValue === false) {
            getFirstValue(atr);
        }
        if (isSecondValue === false) {
            getSecondValue(atr);
        }
    })
}


function getFirstValue(atr) {
    result.innerHTML = "";
    firstValue += atr;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}
function getSecondValue(atr) {
    if (firstValue != "" && sign != "") {
        secondValue += atr;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
    }
}
function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener("click", (e) => {
            // let sign = e.target.getAttribute("value");
            sign = e.target.textContent;
            isFirstValue = true;

        })
    }
}
getSign();


equals[0].addEventListener("click", () => {
    result.innerHTML = "";
    if (sign === "+") {
        resultValue = firstValue + secondValue;
    } else if (sign === "-") {
        resultValue = firstValue - secondValue;
    } else if (sign === "x") {
        resultValue = firstValue * secondValue;
    } else if (sign === "/") {
        resultValue = firstValue / secondValue;
    }

    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";
    checkResultLength();
})




function checkResultLength() {
    resultValue = JSON.stringify(resultValue);
    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}
negative[0].addEventListener("click", () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
        resultValue = -resultValue;
    }
    result.innerHTML = resultValue;

})

percent[0].addEventListener("click", () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
        resultValue = resultValue / 100;
    }
    result.innerHTML = resultValue;

})
clear[0].addEventListener("click", (e) => {
    result.innerHTML = "0";
    firstValue = "0";
    secondValue = "";
    isFirstValue = false;
    isSecondValue = false;
    sign = "";
    resultValue = 0;
})