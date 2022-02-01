
// add your code here.
export const solve = (params) => {
    let solution = null;
    return solution;
};

export async function attempt(params) {
    let test = solve(4);
    if (test !== 4) { throw "Test 1 failed to pass"; }
    
    test = solve(20);
    if (test !== 625) { throw "Test 2 failed to pass"; }
    
    test = solve(95);
    if (test !== 104651417) { throw "Test 3 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions