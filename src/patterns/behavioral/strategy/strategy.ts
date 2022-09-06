interface ArithmeticOperation {
  calculate: (a: number, b: number) => number;
}

enum Operations {
  ADDITION = 'addition',
  DIVISION = 'division',
  MULTIPLICATION = 'multiplication',
  SUBTRACTION = 'subtraction',
}

type CalculatorConstructor = {
  a: number;
  b: number;
  operation: Operations;
};

interface ICalculator {
  calculate: () => number;
  setOperation: (operation: Operations) => void;
}

class Calculator implements ICalculator {
  private a: number;
  private b: number;
  private operation: ArithmeticOperation;

  constructor({ a, b, operation }: CalculatorConstructor) {
    this.a = a;
    this.b = b;

    const Strategy = strategies[operation];

    this.operation = new Strategy();
  }

  setOperation(operation: Operations) {
    const Strategy = strategies[operation];

    this.operation = new Strategy();
  }

  calculate() {
    return this.operation.calculate(this.a, this.b);
  }
}

class AdditionOperation implements ArithmeticOperation {
  calculate(a: number, b: number) {
    return a + b;
  }
}

class SubtractionOperation implements ArithmeticOperation {
  calculate(a: number, b: number) {
    return a - b;
  }
}

class MultiplicationOperation implements ArithmeticOperation {
  calculate(a: number, b: number) {
    return a * b;
  }
}

class DivisionOperation implements ArithmeticOperation {
  calculate(a: number, b: number) {
    return a / b;
  }
}

const strategies = {
  [Operations.ADDITION]: AdditionOperation,
  [Operations.SUBTRACTION]: SubtractionOperation,
  [Operations.DIVISION]: DivisionOperation,
  [Operations.MULTIPLICATION]: MultiplicationOperation,
};

const calculator = new Calculator({
  a: 2,
  b: 4,
  operation: Operations.ADDITION,
});

console.log('ADDITION:');
console.log(calculator.calculate());
console.log('SUBTRACTION:');
calculator.setOperation(Operations.SUBTRACTION);
console.log(calculator.calculate());
console.log('DIVISION:');
calculator.setOperation(Operations.DIVISION);
console.log(calculator.calculate());
console.log('MULTIPLICATION:');
calculator.setOperation(Operations.MULTIPLICATION);
console.log(calculator.calculate());
