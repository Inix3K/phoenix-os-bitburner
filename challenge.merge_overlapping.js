
// add your code here.
export const solve = (params) => {
    let solution = null;
    return solution;
};
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

export async function attempt(params) {
    let test = solve([[1,3],[2,6],[8,10],[15,18]]);
    let solution = [[1,6],[8,10],[15,18]];
    if (!arrayEquals(test, solution)) { throw "Test 1 failed to pass"; }
    
    test = solve([[1,4],[4,5]]);
    solution = [[1,5]];
    if (!arrayEquals(test, solution)) { throw "Test 2 failed to pass"; }
    
    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions