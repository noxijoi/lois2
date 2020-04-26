function findDummyVars(table, n) {
    let t = [];

    let letsNames = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
        let object = table[i];
        let r = [];
        for (let key of Object.keys(object)) {
            letsNames.push(key);
            let val = object[key];
            r.push(val)
        }
        t.push(r)
    }

    letsNames.pop();
    let dummies = [];
    for (let i = 0; i < n; i++) {
        let matchResultCount = 0;
        for (let j = 0; j < Math.pow(2, n); j++) {
            if (t[j][i] === "0") {
                let f1 = t[j][n];
                let f2 = t[j + Math.pow(2, n - i - 1)][n];
                if (f1 === f2) {
                    matchResultCount++;
                }
            }
        }
        if (matchResultCount === Math.pow(2, n) / 2) {
            let letName = letsNames[i];
            dummies.push(letName);
        }
    }
    return dummies;
}

function newTestTypeFormula() {
    let test = document.getElementById("outputTypeFormula").value;
    let outputCheckTypeFormula = document.getElementById("outputCheckTypeFormula");
    if (verificationFormula(test)) {
        outputCheckTypeFormula.innerHTML = "Данное выражение является формулой";
        document.getElementById("hiddenForm").hidden = false;
        let object = getTableTruth(test);
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = objectToTable(object.table, object.sizeSymbolInFormula);
        let dummyVars = findDummyVars(object.table, object.sizeSymbolInFormula);
        let infoDiv = document.getElementById("dummy");
        if (dummyVars.length === 0) {
            infoDiv.innerHTML = "Нет фиктивных переменных"
        } else {
            infoDiv.innerHTML = "Фиктивные переменные: " + dummyVars;
        }
    } else {
        document.getElementById("hiddenForm").hidden = true;
        outputCheckTypeFormula.innerHTML = "Данное выражение не является формулой";
    }
}


const tests = [
    {
        question:'в формуле ((A|B)&((!A)|B)) нет фиктивных переменных?',
        isRight: true
    },
    {
        question:'в формуле ((A|B)&((!A)|D)) А - фиктивная переменная?',
        isRight: false
    },
    {
        question:'в формуле ((((A|B)|C)&(((!A)|B)|C))&((A|B)|(!C))) С и А - фиктивные переменные?',
        isRight: false
    }
];

function nextTest(){
    let randomQuestion = tests[Math.floor(Math.random() * tests.length)];
    let formulaContainer = document.getElementById('test-formula');
    formulaContainer.innerText = randomQuestion.question;
    formulaContainer.value = randomQuestion.isRight;
    let testMessage = document.getElementById("test-result");
    testMessage.innerText ='';

}

function yesClick(){
    let formulaContainer = document.getElementById('test-formula');
    let rightRes = formulaContainer.value;
    let testMessage = document.getElementById("test-result");
    if(rightRes){
        testMessage.innerText ='You are right!';
    } else {
        testMessage.innerText = 'You are wrong!';
    }
}

function noClick(){
    let formulaContainer = document.getElementById('test-formula');
    let rightRes = formulaContainer.value;
    let testMessage = document.getElementById("test-result");
    if(rightRes){
        testMessage.innerText = 'You are wrong!';
    } else {
        testMessage.innerText ='You are right!';
    }
}