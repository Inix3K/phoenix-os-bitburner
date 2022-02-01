
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    let test = solve("()())()");
    test.forEach(function (t) {
        if (!["(())()","()()()"].includes(t)) { throw "Test 1 failed to pass"; }
    });
    if (test.length !== 1) { throw "Test 1 failed to pass";}

    
    test = solve("(a)())()");
    test.forEach(function (t) {
        if (!["(a())()","(a)()()"].includes(t)) { throw "Test 2 failed to pass"; }
    });
    if (test.length !== 2) { throw "Test 2 failed to pass";}

    
    test = solve(")(");
    if (test !== [""]) { throw "Test 3 failed to pass";}


    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
    return tests(params);
}

