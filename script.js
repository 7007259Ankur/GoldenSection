function func(x) {
    // Define your function here
    return eval(document.getElementById("function").value);
}

function goldenSectionOptimization(a, b, tolerance, type) {
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

    let x1 = b - (b - a) / phi;
    let x2 = a + (b - a) / phi;
    let f_x1 = func(x1);
    let f_x2 = func(x2);

    while (Math.abs(b - a) > tolerance) {
        if (type === 'min') {
            if (f_x1 < f_x2) {
                b = x2;
                x2 = x1;
                f_x2 = f_x1;
                x1 = a + (b - x2);
                f_x1 = func(x1);
            } else {
                a = x1;
                x1 = x2;
                f_x1 = f_x2;
                x2 = b - (x1 - a);
                f_x2 = func(x2);
            }
        } else if (type === 'max') {
            if (f_x1 > f_x2) {
                b = x2;
                x2 = x1;
                f_x2 = f_x1;
                x1 = a + (b - x2);
                f_x1 = func(x1);
            } else {
                a = x1;
                x1 = x2;
                f_x1 = f_x2;
                x2 = b - (x1 - a);
                f_x2 = func(x2);
            }
        }
    }

    return (a + b) / 2;
}

function optimize(type) {
    const interval = document.getElementById("interval").value.split(",").map(parseFloat);
    const a = interval[0];
    const b = interval[1];
    const tolerance = parseFloat(document.getElementById("tolerance").value);

    let result;
    if (type === 'min') {
        result = goldenSectionOptimization(a, b, tolerance, 'min');
        document.getElementById("result").innerHTML = `Minimum point: ${result.toFixed(4)}, Minimum value: ${func(result).toFixed(4)}`;
    } else if (type === 'max') {
        result = goldenSectionOptimization(a, b, tolerance, 'max');
        document.getElementById("result").innerHTML = `Maximum point: ${result.toFixed(4)}, Maximum value: ${func(result).toFixed(4)}`;
    }
}
