interface ISequenceSorter<TElement> {
  quickSort(sequence: Array<TElement>): TElement[];
  mergeSort(sequence: Array<TElement>): TElement[];
}

class ArraySorter<T> implements ISequenceSorter<T> {
  constructor() {}

  public quickSort(sequence: Array<T>): T[] {
    // ...
    return sequence;
  }

  public mergeSort(sequence: Array<T>): T[] {
    // ...
    return sequence;
  }
}



interface ISortingStrategy<TElement = number> {
  sort(sequence: Array<TElement>): TElement[];
}

class BubbleSortingStrategy<T> implements ISortingStrategy<T> {
  public sort(sequence: Array<T>): T[] {
    const result = [...sequence];
    console.log('Using Bubble Sorting strategy.');

    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence.length - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
        }
      }
    }

    return result;
  }
}

class SelectionSortingStrategy<T> implements ISortingStrategy<T> {
  public sort(sequence: Array<T>): T[] {
    const result = [...sequence];
    const length = sequence.length;

    console.log('Using Selection sorting strategy.');

    for (let i = 0; i < length; i++) {
      let minIdx = i;

      for (let next = i + 1; next < length; next++) {
        if (result[next] < result[minIdx]) {
          minIdx = next;
        }
      }

      [result[i], result[minIdx]] = [result[minIdx], result[i]];
    }

    return result;
  }
}




interface IArraySorter<TElement> {
  setSortingStrategy(strategy: ISortingStrategy<TElement>): this;
  performSorting(sequence: Array<TElement>): NonNullable<TElement>[];
}

class NumericArraySorter implements IArraySorter<number> {
  constructor(private _sortStrategy: ISortingStrategy<number>) {}

  public setSortingStrategy(strategy: ISortingStrategy<number>): this {
    this._sortStrategy = strategy;
    return this;
  }

  public performSorting(sequence: Array<number>): number[] {
    return this._sortStrategy.sort(sequence);
  }
}


function formatResult<T>(result: Array<NonNullable<T>>): string {
  return result.join(', ');
}

const sampleArray = [3, 4, 0, -1, 2];


const mergeSortStrategy = new SelectionSortingStrategy<number>();
const numArraySorter = new NumericArraySorter(mergeSortStrategy);

console.log(formatResult(numArraySorter.performSorting(sampleArray)));

numArraySorter.setSortingStrategy(new BubbleSortingStrategy());
console.log(formatResult(numArraySorter.performSorting(sampleArray)));

