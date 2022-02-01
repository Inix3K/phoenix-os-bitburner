
// add your code here.
export const solve = (params) => {
    let solution = null;
    return solution;
};

export async function attempt(params) {
    let test = solve([3,7]);
    if (test !== 28) { throw "Test 1 failed to pass"; }
    
    test = solve([3,2]);
    if (test !== 3) { throw "Test 2 failed to pass"; }
    
    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions