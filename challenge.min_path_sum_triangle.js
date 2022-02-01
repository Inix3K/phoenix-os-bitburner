
// add your code here.
const solve = (params) => {
    // For storing the result
    // in a 1-D array, and
    // simultaneously updating
    // the result.
    let memo = [];
    let n = params.length - 1;

    // For the bottom row
    for (let i = 0; i < params[n].length; i++)
        memo[i] = params[n][i];

    // Calculation of the
    // remaining rows, in
    // bottom up manner.
    for (let i = params.length - 2; i >= 0; i--)
        for (let j = 0; j < params[i].length; j++)
            memo[j] = params[i][j] +
            Math.min(memo[j],
                memo[j + 1]);

    // Return the
    // top element
    let solution = memo[0];
    return solution;
};

function tests(params) {
    let test = solve([[2],[3,4],[6,5,7],[4,1,8,3]]);
    if (test !== 11) { throw "Test 1 failed to pass"; }
    
    test = solve([[-10]]);
    if (test !== -10) { throw "Test 2 failed to pass"; }
    
    test = solve([[3],
                 [9,3],
                [4,4,9],
               [1,2,2,7],
              [8,8,9,1,9],
             [9,4,4,1,4,6],
            [3,6,4,5,1,3,2],
           [6,9,3,3,4,8,6,6],
          [5,7,6,8,4,1,4,9,5],
         [8,5,9,2,7,9,3,8,1,7],
        [5,3,6,2,2,4,6,3,9,5,8]]);

    if (test !== 26) { throw "Test 3 failed to pass";}
    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
    return tests(params);
}