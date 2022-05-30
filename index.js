let fun;
function calcInt(fun_str, fun_var, start, end, accuracy) {
  fun = new Function(fun_var, `return ${formulaPreprocessor(fun_str)};`);

//   return simpsonMethod(fun, Number(start), Number(end), 1000);
  return rombergMethod(fun, Number(start), Number(end), 10, accuracy);
}

function formulaPreprocessor(formula) {
  let processedFormula = formula;

  // replace ^(power) operation
  processedFormula = processedFormula.replace(/[\^]/g, '**');

  return processedFormula;
}

function createMatrix(n, m, value = 0) {
  const result = [];

  for (let i = 0; i < n; i += 1) {
    result[i] = [];
    for (let j = 0; j < m; j += 1) {
      result[i][j] = value;
    }
  }

  return result;
}
function printMatrix(matrix) {
  matrix.forEach(element => {
    console.log(element.join(', '));
  })
}


function simpsonMethod(func, lowerLimit, upperLimit, stepsNumber)
{
    // Calculating the value of h
    let stepAmount = (upperLimit - lowerLimit) / stepsNumber;

    // Array for storing value of x and f(x)
    let x = Array(10)
    let fx = Array(10);

    // Calculating values of x and f(x)
    for (let i = 0; i <= stepsNumber; i++) {
        x[i] = lowerLimit + i * stepAmount;
        func[i] = func(x[i]);
    }

    // Calculating result
    let res = 0;
    for (let i = 0; i <= stepsNumber; i++) {
        if (i == 0 || i == stepsNumber)
            res += func[i];
        else if (i % 2 != 0)
            res += 4 * func[i];
        else
            res += 2 * func[i];
    }
    res = res * (stepAmount / 3);
    return res;
}



// calculates integral using Romber mathod
function rombergMethod(func, lowerLimit, upperLimit, stepsNumber, accuracy) {
  const table = createMatrix(stepsNumber, stepsNumber);

  let step = upperLimit - lowerLimit;

  table[0][0] = (step * (func(lowerLimit) + func(upperLimit))) / 2;

  for (let j = 1; j < stepsNumber; j += 1) {
    step /= 2;

    table[j][0] = simpsonMethod(func, lowerLimit, upperLimit, j ** 2) / 2;

    let sum = 0;
    for (let i = 1; i < 2 ** j + 1; i += 2) {
      sum += func(lowerLimit + i * step) * step;
    }

    table[j][0] = table[j][0] + sum;

    for (let k = 1; k < j + 1; k += 1) {
      const val =
        table[j][k - 1] +
        (table[j][k - 1] - table[j - 1][k - 1]) / (4 ** k - 1);
      table[j][k] = val;

      if (Math.abs(table[j][k] - table[j-1][k]) < accuracy) {
          printMatrix(table);
          return table[j][k];
        }

        printMatrix(table);
    }
  }

  return table[stepsNumber - 1][stepsNumber - 1];
}

// UI
const getById = id => document.getElementById(id);

const runBtn = getById('runBtn');
const accuracyInput = getById('calcAccuracy');
const runBtnRect = getById('runBtnRect');
const output = getById('intAnswerValue');
const intStart = getById('intStart');
const intEnd = getById('intEnd');
const intFormStr = getById('intFormStr');
const intVar = getById('intVar');

runBtn.addEventListener('click', () => {
  const res = calcInt(intFormStr.value,
    intVar.value,
    intStart.value,
    intEnd.value,
    accuracyInput.value);

  output.innerText = `≈ ${Math.round(res * 1000) / 1000}`;

  drawPlot(+intStart.value, +intEnd.value, 10, fun, 'fplot')
});
