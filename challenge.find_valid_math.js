
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    let test = solve([123, 6]);

    test.forEach(function (t) {
        if (!["1+2+3", "1*2*3"].includes(t)) { throw "Test 1 failed to pass"; }
    });

    if (test.length != 2) { throw "Test 1 failed to pass"; }

    
    test = solve([105, 5]);
    test.forEach(function (t) {
        if (!["1*0+5", "10-5"].includes(t)) { throw "Test 2 failed to pass"; }
    });

    if (test.length != 2) { throw "Test 2 failed to pass"; }
    
    
    test = solve([232,8]);
    test.forEach(function (t) {
        if (!["2*3+2", "2+3*2"].includes(t)) { throw "Test 3 failed to pass"; }
    });

    if (test.length != 2) { throw "Test 3 failed to pass"; }

    test = solve([3456237490, 9191]);
    if (test !== [""]) { throw "Test 4 failed to pass"; }


    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
    return tests(params);
}
