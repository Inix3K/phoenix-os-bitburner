
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    let test = solve(5);
    if (test !== 5) { throw "Test 1 failed to pass"; }
    
    test = solve(95);
    if (test !== 19) { throw "Test 2 failed to pass"; }
    
    test = solve(602);
    if (test !== 43) { throw "Test 3 failed to pass"; }

    test = solve(981);
    if (test !== 109) { throw "Test 4 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
    return tests(params);
}
