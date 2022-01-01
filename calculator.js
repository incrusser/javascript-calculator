//calculadora
var lastWasOperator;
var isDotInTerm = false;
const operators = ['+','-','/','*'];

function whatOperatorIs(val){
    let whatOperator;
    whatOperator = operators.find(i => i === val)
    return whatOperator;
}

//Checks if it can write the pressed value in order not to begin with an operator
function canWrite(val){
    return !(lastWasOperator != undefined && whatOperatorIs(val) != undefined) && 
           !(document.getElementById("display").innerHTML === "" && whatOperatorIs(val) != undefined);
}

//Checks the special dot's case.
function isDotException(val){
    return (document.getElementById("display").innerHTML === "" && val === '.') || 
           (lastWasOperator != undefined && val === '.');
}

//Checks for two dots between operators.
function dotCheck(val){
    if (val === "."){isDotInTerm = true;}
    if (whatOperatorIs(val) != undefined){isDotInTerm = false;}
}
//Avoids two dots between.
function isDoubleDots(val){
    return (isDotInTerm && val === ".");
}


//Use the minus operator as a negative indicator for the following number.
function isNegativeException(val){
    return val === '-' && (lastWasOperator != '-'||document.getElementById("display").innerHTML === "");
}

function dis(val){
    if(canWrite(val) || isNegativeException(val)){
        if(isDotException(val) && !isDoubleDots(val)){
            /* 
             Dot before any number and dot immediatly after an operator exceptions.
             If you type "." and the display is empty, it will appear as "0.".
             If you type "." after a + - / *, you will get a "0." as well.
            */
            document.getElementById("display").innerHTML += '0.'
            dotCheck(val);
        }
        else if(!isDoubleDots(val)){
            //Concatenate the pressed value with the existent display.
            document.getElementById("display").innerHTML+=val;
            //Check if the pressed value is an operator.
            lastWasOperator = whatOperatorIs(val);
            //Check if the last value is a dot
            dotCheck(val);
        }

    }
}
    
//Solving through eval() function.
function solve(){   
    let x = document.getElementById("display").innerHTML;
    let y = eval(x).toFixed(2);
    document.getElementById("display").innerHTML = y;
    isDotInTerm = true;
}
    
//Clean display, replacing the display with an empty string
function clr(){
   document.getElementById("display").innerHTML = "";
   isDotInTerm = false;
}