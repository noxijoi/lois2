let unaryOrBinaryComplexFormula = new RegExp('([(][!]([A-Z]|[0-1])[)])|([(]([A-Z]|[0-1])((&)|(\\|)|(->)|(~))([A-Z]|[0-1])[)])', 'g');
let atomOrConstant = new RegExp('([A-Z]|[0-1])', 'g');
let replaceFormula = "R";
let tempFormula;

function verificationFormula(formula){

      while (formula != tempFormula ) {
        tempFormula = formula;
        formula = formula.replace(unaryOrBinaryComplexFormula, replaceFormula);
      }
      tempFormula=0;
    let resultType = formula.match(new RegExp(atomOrConstant, 'g'));
    return (formula.length === 1) && (resultType != null) && (resultType.length === 1);
}
