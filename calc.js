var a = null;
var b = null;
var op = null;

var toggleDecimal = true;
var toggleOp = true;
var toggleSwap = true;
var screenDisplay = document.querySelector(".screen");

const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const decButton = document.querySelector(".dec");
const eqButton = document.querySelector(".eq")
const clrButton = document.querySelector(".clr")
const bckButton = document.querySelector(".bck")


function add (a,b){
    return a+b;
}

function subtract (a,b){
    return a-b;
}

function multiply (a,b){
    return a*b;
}

function divide (a,b){
    if (b != 0) {
        return a/b;
    }

    return null;
}

function operate (a, b, op) {
    switch(op) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);       
    }
}

function resetCalc(){
    a = null;
    b = null;
    op = null;
    toggleDecimal = true;
    toggleOp = true;
    toggleSwap = true;
    screenDisplay.innerText = "";
}

function numPress (numBtn) {
    if(!a && !b){
        //lock operator if its the 2nd number
        if(!toggleOp) {
            toggleSwap = false;
        }
        screenDisplay.innerText += numBtn.innerText;
    } else {
        resetCalc()
        screenDisplay.innerText += numBtn.innerText;
    }
}

function decPress (decBtn) {
    if(screenDisplay.innerText == "ERROR") {
        return
    }

    if(toggleDecimal){
        screenDisplay.innerText += decBtn.innerText;
        toggleDecimal = false;
    }
}

function opPress (opBtn) {
    if(screenDisplay.innerText == "ERROR") {
        return
    }

    if(toggleOp && screenDisplay.innerText.length > 0){
        op = opBtn.innerText
        screenDisplay.innerText += op;
        a = null;
        b = null;
        
        toggleOp = false;
        toggleDecimal = true;

    } else if (!toggleOp && toggleSwap) {
        op = opBtn.innerText
        screenDisplay.innerText = screenDisplay.innerText.substring(0, screenDisplay.innerText.length-1) + op;
    } else if (!toggleSwap){
        eqPress();
        if(b != 0 && op == "/") {    
            opPress(opBtn)
        }
    }
}

function eqPress () {
    if(screenDisplay.innerText == "ERROR") {
        return
    }

    if(!toggleSwap) {
        numbers = screenDisplay.innerText.split(op)
        a = parseFloat(numbers[0]);
        b = parseFloat(numbers[1]);

        let result = operate(a,b,op)

        if(result){
            result = parseFloat(result.toFixed(2))
            a = result;
            toggleOp = true;
            screenDisplay.innerText = result;
        } else {
            screenDisplay.innerText = "ERROR"
        }
    }
}

numButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        numPress(btn);
    })
})

opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        opPress(btn);
    })
})

decButton.addEventListener("click", () => {
    decPress(decButton)
})

eqButton.addEventListener("click", () => {
    eqPress()
})

clrButton.addEventListener("click", () => {
    resetCalc()
})



