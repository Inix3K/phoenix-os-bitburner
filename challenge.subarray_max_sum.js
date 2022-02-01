
// add your code here.
const solve = (params) => {
    let maxSum = -Infinity;
    let currentSum = 0;
  
    // We need to keep track of the starting and ending indices that contributed to our maxSum
    // so that we can return the actual subarray. From the beginning let's assume that whole array
    // is contributing to maxSum.
    let maxStartIndex = 0;
    let maxEndIndex = params.length - 1;
    let currentStartIndex = 0;
  
    params.forEach((currentNumber, currentIndex) => {
      currentSum += currentNumber;
  
      // Update maxSum and the corresponding indices if we have found a new max.
      if (maxSum < currentSum) {
        maxSum = currentSum;
        maxStartIndex = currentStartIndex;
        maxEndIndex = currentIndex;
      }
  
      // Reset currentSum and currentStartIndex if currentSum drops below 0.
      if (currentSum < 0) {
        currentSum = 0;
        currentStartIndex = currentIndex + 1;
      }
    });
  
    let max = params.slice(maxStartIndex, maxEndIndex + 1);
    let solution = max.reduce((a,b) => a+b,0);
    return solution;
};

function tests(params) {
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
export function answer(params) {
  return tests(params);
}