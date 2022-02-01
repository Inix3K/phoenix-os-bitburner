function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

const array_jumping_generate_graph = (solution_array) => {
    let graph = new Map();
    for (let i = 0; i < solution_array.length; i++) {
        graph.set(i, range(solution_array[i], i+1)
        );
    }
    return graph;
};

const array_jumping_traverse_graph = (graph, source) => {
    const stack = [ source ];
    const result = [];
    const visited = {};
    visited [ source ] = true;
    let current;

    while (stack.length > 0) {
        current = stack.pop();
        // console.log(current);
        if (current >= graph.size) { return true; }
        result.push(current);
        try {
            graph.get(current).forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        } catch (e) {
            console.log(e);
            return true;
        }
    }
    return false;
};

// add your code here.
export const solve = (params) => {
    let graph = array_jumping_generate_graph(params);
    let solution = array_jumping_traverse_graph(graph, 0);
    return solution;
};

export async function attempt(params) {
    let test = solve([1,1,2,3,4]);
    if (test !== true) { throw "Test 1 failed to pass"; }
    
    test = solve([0,0,5]);
    if (test !== false) { throw "Test 2 failed to pass"; }
    
    test = solve([10]);
    if (test !== true) { throw "Test 3 failed to pass"; }

    test = solve([6, 0, 0, 0, 0, 0]);
    if (test !== true) { throw "Test 4 failed to pass"; }

    test = solve([1, 5, 1, 0, 1, 0, 4, 0, 0, 0, 1, 1]);
    if (test !== true) { throw "Test 5 failed to pass"; }

    test = solve([1, 1, 2, 0, 1, 2, 2, 0]);
    if (test !== true ) { throw "Test 6 failed to pass"; }

    // all tests succeeded. valid solution found.
    return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export async function main(ns) {
    ns.tprint(await attempt([2, 0, 0, 1, 0, 0]));
}