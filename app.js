let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.calc-btn-operator');
let decimalBtn = document.querySelector('.decimal');
let clearBtns = document.querySelectorAll('.clear-btn');
let resultBtn = document.querySelector('.calc-btn-equal');
let display = document.getElementById('display');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

for(i=0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    })
};

for(i=0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
        operation(e.target.textContent);
    })
};

for(i=0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        clear(e.srcElement.id);
    })
};

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', display);



function numberPress(number) {
    if(memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if(display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
};

function operation(oper) {
    let localOperationMemory = +display.value; 
    
    if(memoryNewNumber && memoryPendingOperation !== "=" && memoryPendingOperation === '√') {
        memoryCurrentNumber = Math.sqrt(localOperationMemory);
        display.value = memoryCurrentNumber;
        memoryNewNumber = false;
    } else {
        memoryNewNumber = true;
        if(memoryPendingOperation === '+') {
            memoryCurrentNumber = +(memoryCurrentNumber + parseFloat(localOperationMemory)).toFixed(2);
        } else if(memoryPendingOperation === '-') {
            memoryCurrentNumber = (memoryCurrentNumber - parseFloat(localOperationMemory)).toFixed(2);
        } else if(memoryPendingOperation === '*') {
            memoryCurrentNumber = (memoryCurrentNumber * parseFloat(localOperationMemory)).toFixed(2);
        } else if(memoryPendingOperation === '/') {
            memoryCurrentNumber = (memoryCurrentNumber / parseFloat(localOperationMemory)).toFixed(2);
        } else if(memoryPendingOperation === '^') {
            memoryCurrentNumber = Math.pow(memoryCurrentNumber,localOperationMemory);
        } else {
            memoryCurrentNumber = localOperationMemory;
        }
        display.value = memoryCurrentNumber;
        memoryPendingOperation = oper; 
    }
    
};

function decimal() {
    let localDecimalMemory = display.value; 
    if(memoryNewNumber) {
        localDecimalMemory = "0.";
        memoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf(".") === -1) {
            localDecimalMemory += ".";
        }
    }
    display.value = localDecimalMemory;
};

function clear(id) {
    if(id === "ce") {
        display.value = '0';
        memoryNewNumber = true;
    } else if(id === "c") {
        display.value = '0';
        memoryNewNumber = true;
        memoryCurrentNumber = 0;
        memoryPendingOperation = '';
    }
}
