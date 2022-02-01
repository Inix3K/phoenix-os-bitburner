
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    let test = solve([1,1,2,3,4]);
    if (test !== true) { throw "Test 1 failed to pass"; }
    
    test = solve([0,0,5]);
    if (test !== false) { throw "Test 2 failed to pass"; }
    
    test = solve([10]);
    if (test !== true) { throw "Test 3 failed to pass"; }

    test = solve([6, 0, 0, 0, 0, 0]);
    if (test !== true) { throw "Test 4 failed to pass"; }

    test = solve([1, 5, 1, 0, 1, 0, 4, 0, 0, 0, 1, 1]);
    if (test !== true) { throw "Test 5 failed to pass"; }

    test = solve([1, 1, 2, 0, 1, 2, 2, 0]);
    if (test !== true ) { throw "Test 6 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
    return tests(params);
}
