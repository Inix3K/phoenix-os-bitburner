
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    let test = solve([2, [2,4,1]]);
    if (test !== 2) { throw "Test 1 failed to pass"; }
    
    test = solve([2,[3,2,6,5,0,3]]);
    if (test !== 7) { throw "Test 2 failed to pass"; }
    
    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function attempt(params) {
    return tests(params);
}

