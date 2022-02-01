
// add your code here.
const solve = (params) => {
    return params.reduce(function (accumulator, current, idx, arr) {
        if (arr[idx+1] > current){
            // console.log("Index ", idx, " profit ", (arr[idx+1]-current), " cumulatively ", accumulator);
            return accumulator + (arr[idx+1]-current);
        } else { return accumulator || 0; }
    }, 0);

};

function tests(params) {
    let test = solve([7,1,5,3,6,4]);
    if (test !== 7) { throw "Test 1 failed to pass"; }
    
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
export function answer(params) {
    return tests(params);
}