const mathOperation = (mathExpr) => {
    let duplicateMathExpr = mathExpr;
    let parsedMathExpr;
    duplicateMathExpr = duplicateMathExpr.split(/\b/);

    //joining all decimal values
    duplicateMathExpr.forEach(element => {
        if(element == ".") {
            let decimalVal =  duplicateMathExpr[duplicateMathExpr.indexOf(element) - 1] + element + duplicateMathExpr[duplicateMathExpr.indexOf(element) + 1];
            duplicateMathExpr.splice(duplicateMathExpr.indexOf(element) - 1, 3, decimalVal); 
        }
    });

    //deal with division in the expression through duplicateMathExpr
    duplicateMathExpr.forEach(element => {
        let divValue;
        if(element == "/") {
            divValue = parseFloat(duplicateMathExpr[duplicateMathExpr.indexOf(element)-1]) / parseFloat(duplicateMathExpr[duplicateMathExpr.indexOf(element)+1]);
            duplicateMathExpr.splice(duplicateMathExpr.indexOf("/")-1, 3, divValue.toString());
        }
    });

    //deal with multiplication in the expression through duplicateMathExpr
    duplicateMathExpr.forEach(element => {
        let multiplyValue;
       if(element == "*") {
            multiplyValue = parseFloat(duplicateMathExpr[duplicateMathExpr.indexOf(element)-1]) * parseFloat(duplicateMathExpr[duplicateMathExpr.indexOf(element)+1]);
            duplicateMathExpr.splice(duplicateMathExpr.indexOf(element)-1, 3, multiplyValue.toString());
        } 
    });

    //deal with subtraction in the expression through duplicateMathExpr
    let subtractValue = 0;
    duplicateMathExpr.forEach(element => {
        if(element == "-") {
            subtractValue += -parseFloat(duplicateMathExpr[duplicateMathExpr.indexOf(element) + 1]);
            duplicateMathExpr.splice(duplicateMathExpr.indexOf(element), 2, subtractValue);
        }
    });


    //remove all "+" elements from duplicateMathExpr
    duplicateMathExpr = duplicateMathExpr.filter(element => element !== "+");

    //converting all string values to floats
    duplicateMathExpr.forEach(element => {
        let addValue = 0;
            if(typeof(element) == "string") {
                addValue = parseFloat(element);
                duplicateMathExpr.splice(duplicateMathExpr.indexOf(element), 1, addValue);
            }   
    });


    //return final result
    if(duplicateMathExpr.length == 0) {
        parsedMathExpr = 0;
        return parsedMathExpr;
    }
    else if(duplicateMathExpr.length > 1) {
        parsedMathExpr = duplicateMathExpr.reduce((a, b) => a+b, 0);
        return parsedMathExpr;
    }
    else if(duplicateMathExpr.includes(NaN)) {
        parsedMathExpr = "Error";
        return parsedMathExpr;
    }
    else {
        parsedMathExpr = duplicateMathExpr[0];
        return parsedMathExpr;
    }         
}