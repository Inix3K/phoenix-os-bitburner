
// add your code here.
const solve = (params) => {
    let K = N-1;

    let dp = Array.from({length: N +1}, (_, i) => 0);
   
    // Update dp[0] to 1
    dp[0] = 1;
 
    // Iterate over the range [1, K + 1]
    for(let row = 1; row < K + 1; row++)
    {
 
        // Iterate over the range [1, N + 1]
        for(let col = 1; col < N + 1; col++)
        {
             
            // If col is greater
            // than or equal to row
            if (col >= row)
               
                // Update current
                // dp[col] state
                dp[col] = dp[col] + dp[col - row];
          }
    }
 
    // Return the total number of ways
    let solution = dp[N]-1;

    return solution;
};

function tests(params) {
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
export function answer(params) {
    return tests(params);
}