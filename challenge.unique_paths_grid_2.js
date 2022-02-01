
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    test = solve([[0,0,0],[0,1,0],[0,0,0]]);
    if (test !== 2) { throw "Test 1 failed to pass"; }
    
    test = solve([[0,1],[0,0]]);
    if (test !== 1) { throw "Test 2 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
    return tests(params);
}
