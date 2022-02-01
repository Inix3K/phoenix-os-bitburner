
// add your code here.
export const solve = (params) => {
    let solution = null;
    return solution;
};

export async function attempt(params) {
    let test = solve([-2,1,-3,4,-1,2,1,-5,4]);
    if (test !== 6) { throw "Test 1 failed to pass"; }
    
    test = solve([1]);
    if (test !== 1) { throw "Test 2 failed to pass"; }
    
    test = solve([5,4,-1,7,8]);
    if (test !== 23) { throw "Test 3 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions