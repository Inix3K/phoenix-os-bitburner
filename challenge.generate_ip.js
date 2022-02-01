
// add your code here.
const solve = (params) => {
    let solution = null;
    return solution;
};

function tests(params) {
    let test = solve("25525511135");

    test.forEach(function (t) {
        if (!["255.255.11.135", "255.255.111.35"].includes(t)) { throw "Test 1 failed to pass"; }
    });

    if (test.length != 2) { throw "Test 1 failed to pass"; }

    test = solve("0000");
    test.forEach(function (t) {
        if (!["0.0.0.0"].includes(t)) { throw "Test 2 failed to pass"; }
    });

    if (test.length != 1) { throw "Test 2 failed to pass"; }

    test = solve("101023");

    test.forEach(function (t) {
        if (!["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"].includes(t)) { throw "Test 2 failed to pass"; }
    });

    if (test.length != 5) { throw "Test 3 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function attempt(params) {
    return tests(params);
}

