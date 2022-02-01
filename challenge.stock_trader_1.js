
// add your code here.
const solve = (params) => {
    let solution = 0;
    let idx = 0;
    for (let cur of params) {
        for (let rest of params.slice(idx)) {
            if ((rest - cur) > solution) {
                solution = rest-cur;
            }
        }
        idx++;
    }
    return solution;

};

function tests(params) {
    let test = solve([7,1,5,3,6,4]);
    if (test !== 5) { throw "Test 1 failed to pass"; }
    
    test = solve([7,6,4,3,1]);
    if (test !== 0) { throw "Test 2 failed to pass"; }
    
    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
    return tests(params);
}