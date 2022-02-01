
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    let test = solve([3,3,5,0,0,3,1,4]);
    if (test !== 6) { throw "Test 1 failed to pass"; }
    
    test = solve([1,2,3,4,5]);
    if (test !== 4) { throw "Test 2 failed to pass"; }
    
    test = solve([7,6,4,3,1]);
    if (test !== 0) { throw "Test 3 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function attempt(params) {
    return tests(params);
}

