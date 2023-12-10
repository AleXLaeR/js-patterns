enum Operation {
  ADD = '+',
  SUBTRACT = '-',
  DIVIDE = '/',
  MULTIPLY = '*',
}

interface IEvaluable {
  evaluate(first: number, second: number, op: Operation): number;
}

interface IMathOperable {
  add(left: number, right: number): number;

  subtract(left: number, right: number): number;

  divide(left: number, right: number): number;

  multiply(left: number, right: number): number;
}

class Calculator implements IEvaluable {
  constructor() {
  }

  public evaluate(first: number, second: number, op: Operation): number {
    switch (op) {
      case Operation.ADD:
        return first + second;
      case Operation.SUBTRACT:
        return first - second;
      case Operation.DIVIDE:
        return first / second;
      case Operation.MULTIPLY:
        return first * second;
    }
  }
}

class NewCalculator implements IMathOperable {
  constructor() {
  }

  public add(left: number, right: number): number {
    return left + right;
  }

  public subtract(left: number, right: number): number {
    return left - right;
  }

  public divide(left: number, right: number): number {
    return left / right;
  }

  public multiply(left: number, right: number): number {
    return left * right;
  }
}

class CalculatorAdapter
  /* Class-level (inheritance-based) Adapter
   extends NewCalculator */
  implements IEvaluable {

  // Object-level (composition-based) Adapter
  constructor(private readonly _calculator: IMathOperable) {
  }

  public evaluate(first: number, second: number, op: Operation): number {
    switch (op) {
      case Operation.ADD:
        return this._calculator.add(first, second);
      case Operation.SUBTRACT:
        return this._calculator.subtract(first, second);
      case Operation.DIVIDE:
        return this._calculator.divide(first, second);
      case Operation.MULTIPLY:
        return this._calculator.multiply(first, second);
    }
  }
}

// class ComputeCacheDecorator implements IEvaluable {
//   private _cache = new Map<string, number>();
//
//   constructor(private readonly _adapter: CalculatorAdapter) {
//   }
//
//   public evaluate(first: number, second: number, op: Operation): number {
//     const reqPayload = JSON.stringify(arguments);
//
//     if (this._cache.has(reqPayload)) {
//       console.log('Cache was hit.');
//       return this._cache.get(reqPayload)!;
//     }
//
//     const result = this._adapter.evaluate(first, second, op);
//     this._cache.set(reqPayload, result);
//     return result;
//   }
// }

const oldCalc = new Calculator;
console.log(oldCalc.evaluate(3, 5, Operation.MULTIPLY));

const newCalc = new NewCalculator;
console.log(newCalc.multiply(3, 5));


const calcAdapter = new CalculatorAdapter(newCalc);
// const cachingAdapter = new ComputeCacheDecorator(calcAdapter);

console.log(calcAdapter.evaluate(3, 5, Operation.MULTIPLY));
