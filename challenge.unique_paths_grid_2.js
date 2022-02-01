
// add your code here.
const solve = (params) => {
  let r = params.length, c = params[0].length;

  // create a 2D-matrix and initializing
  // with value 0
  let paths = new Array(r);
  for(let i = 0; i < r; i++)
  {
      paths[i] = new Array(c);
    for(let j = 0; j < c; j++)
    {
      paths[i][j] = 0;
    }
  }

  // Initializing the left corner if
  // no obstacle there
  if (params[0][0] == 0)
    paths[0][0] = 1;

  // Initializing first column of
  // the 2D matrix
  for(let i = 1; i < r; i++)
  {
    // If not obstacle
    if (params[i][0] == 0)
      paths[i][0] = paths[i - 1][0];
  }

  // Initializing first row of the 2D matrix
  for(let j = 1; j < c; j++)
  {

    // If not obstacle
    if (params[0][j] == 0)
      paths[0][j] = paths[0][j - 1];
  } 

  for(let i = 1; i < r; i++)
  {
    for(let j = 1; j < c; j++)
    {

      // If current cell is not obstacle
      if (params[i][j] == 0)
        paths[i][j] = paths[i - 1][j] +
        paths[i][j - 1];
    }
  }

  // Returning the corner value
  // of the matrix
  return paths[r - 1][paths[r - 1].length - 1];
};

function tests(params) {
  let test = solve([3,7]);
  if (test !== 28) { throw "Test 1 failed to pass"; }
  
  test = solve([3,2]);
  if (test !== 3) { throw "Test 2 failed to pass"; }
  
  // all tests succeeded. valid solution found.
  return solve(params);
}

// note, challenges are much easier to solve in an IDE.
// working in an IDE, you'll want to remove the exports.
// without an IDE, you can add a main(ns) statement to test your solutions
export function answer(params) {
  return tests(params);
}