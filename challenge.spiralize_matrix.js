// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

function tests(params) {
    let test = solve([[1,2,3],[4,5,6],[7,8,9]]);
    let solution = [1, 2, 3, 6, 9, 8, 7, 4, 5];
    if (!arrayEquals(test,solution)) { throw "Test 1 failed to pass"; }

    
    test = solve([[1,2,3,4],[5,6,7,8],[9,10,11,12]]);
    solution = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7];
    if (!arrayEquals(test,solution)) { throw "Test 2 failed to pass"; }

    test = solve([
        [47,42,14,23,27, 4, 3,49],
        [ 7,44,39,44,30,33,40,39],
        [32, 4,33,28,11, 6,36, 1],
        [15,21,44, 1,10,50,40, 5],
        [47,47, 5,16, 6,33,46,28],
        [23,30,10, 5, 8,36, 4,48],
        [27,15,15, 7,45, 2,40,48],
        [38,25,47,41,17,13,22,34]
        ]);

    solution = [47,42,14,23,27,4,3,49,39,1,5,28,48,48,34,22,13,17,41,47,25,38,27,23,47,15,32,7,44,39,44,30,33,40,36,40,46,4,40,2,45,7,15,15,30,47,21,4,33,28,11,6,50,33,36,8,5,10,5,44,1,10,6,16];
    if (!arrayEquals(test,solution)) { throw "Test 3 failed to pass"; }


    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function attempt(params) {
    return tests(params);
}

