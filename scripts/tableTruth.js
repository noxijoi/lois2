const NEGATION = "!";

const CONJUNCTION = "&";
const DISJUNCTION = "|";
const IMPLICATION = "->";
const EQUIVALENCE = "~";

let countAnswer = 0;
let n;


function getTableTruth(formula) {
    let ANSWER = formula;
    let symbolInFormula = getSymbolInFormula(formula);
    symbolInFormula.sort();
    let sizeSymbolInFormula = symbolInFormula.length;
    n = Math.pow(2, sizeSymbolInFormula);
    let table = {};
    countAnswer = 0;
    for (let i = 0; i < n; i++) {
        let currentNumber = numberInBinaryString(i, sizeSymbolInFormula);
        let tempObject = getConstantForSymbol(symbolInFormula, currentNumber);
        tempObject[ANSWER] = getAnswer(formula, tempObject);
        table[i] = tempObject;
        if (tempObject[ANSWER] === 1) {
            countAnswer++;
        }
    }
    return {
        table: table,
        sizeSymbolInFormula: sizeSymbolInFormula
    }
}

function getSymbolInFormula(formula) {
    let symbol = "([A-Z])";
    symbol = new RegExp(symbol, "g");
    let results = formula.match(symbol) || [];
    return results.filter(function (symbol, index) {
        return results.indexOf(symbol) === index;
    });
}

function numberInBinaryString(number, stringLength) {
    let string = (number >>> 0).toString(2);
    for (let i = string.length; i < stringLength; i++) {
        string = "0" + string;
    }
    return string;
}

function getConstantForSymbol(symbolInFormula, currentNumber) {
    let object = {};
    for (let i = 0; i < symbolInFormula.length; i++) {
        let symbol = symbolInFormula[i];
        object[symbol] = currentNumber[i];
    }

    return object;
}

function getAnswer(formula, tempObject) {
    let constFormula = formula;
    for (let key of Object.keys(tempObject)) {
        let val = tempObject[key];
        constFormula = constFormula.replace(new RegExp(key, 'g'), val);
    }
    return calculateFormula(constFormula);
}

function calculateFormula(formula) {
    let regFormula = "([(][" + NEGATION + "][0-1][)])|" +
        "([(][0-1]((" + CONJUNCTION + ")|(" + "\\" + DISJUNCTION + ")|(" + IMPLICATION + ")|(" + EQUIVALENCE + "))[0-1][)])";
    regFormula = new RegExp(regFormula);
    while (regFormula.exec(formula) != null) {
        let subFormula = regFormula.exec(formula)[0];
        let result = calculateSimpleFormula(subFormula);
        formula = formula.replace(subFormula, result);
    }

    return formula;
}

function calculateSimpleFormula(formula) {
    if (formula.indexOf(NEGATION) > -1) {
        return findNEGATION(formula);
    } else if (formula.indexOf(CONJUNCTION) > -1) {
        return findCONJUNCTION(formula);
    } else if (formula.indexOf(DISJUNCTION) > -1) {
        return findDISJUNCTION(formula);
    } else if (formula.indexOf(IMPLICATION) > -1) {
        return findIMPLICATION(formula);
    } else if (formula.indexOf(EQUIVALENCE) > -1) {
        return findEQUIVALENCE(formula);
    }
}

function findNEGATION(formula) {

    let number = parseInt(formula[2]);
    if (!number) {
        return 1;
    } else {
        return 0;
    }
}

function findCONJUNCTION(formula) {

    let firstValue = parseInt(formula[1]);
    let secondValue = parseInt(formula[3]);
    if (firstValue && secondValue) {
        return 1;
    } else {
        return 0;
    }
}

function findDISJUNCTION(formula) {
    let firstValue = parseInt(formula[1]);
    let secondValue = parseInt(formula[3]);
    if (firstValue || secondValue) {
        return 1;
    } else {
        return 0;
    }
}

function findIMPLICATION(formula) {

    let firstValue = parseInt(formula[1]);
    let secondValue = parseInt(formula[4]);
    if ((!firstValue) || secondValue) {
        return 1;
    } else {
        return 0;
    }
}

function findEQUIVALENCE(formula) {

    let firstValue = parseInt(formula[1]);
    let secondValue = parseInt(formula[3]);
    if (firstValue == secondValue) {
        return 1;
    } else {
        return 0;
    }
}

function objectToTable(tableG, unicsymbolSizeG) {
    let n = Math.pow(2, unicsymbolSizeG);
    let innerHTML = "";
    let tr = "<tr>";
    for (let key of Object.keys(tableG[0])) {
        tr += "<td>" + key + "</td>"
    }
    tr += "</tr>";
    innerHTML += tr;
    for (let i = 0; i < n; i++) {
        let object = tableG[i];
        let tr = "<tr>";
        for (let key of Object.keys(object)) {
            let val = object[key];
            tr += "<td>" + val + "</td>"
        }
        tr += "</tr>";
        innerHTML += tr;
    }
    return innerHTML;
}
