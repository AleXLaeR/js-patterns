// Originator: The object whose state needs to be saved
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
  }
}

// Memento: Represents the snapshot of the originator's state
interface Memento {
  getState(): string;
}

// ConcreteMemento: Implements the Memento interface and stores the state of the originator
class ConcreteMemento implements Memento {
  private state: string;
  private date: Date;

  constructor(state: string) {
    this.state = state;
    this.date = new Date();
  }

  public getState(): string {
    return this.state;
  }

  public getDate(): Date {
    return this.date;
  }
}

// Manages the Mementos but does not have access to the originator's state
class Caretaker {
  private mementos: Memento[] = [];

  public addMemento(memento: Memento): void {
    this.mementos.push(memento);
  }

  public getMemento(index: number): Memento | null {
    return this.mementos[index] || null;
  }
}

// Example usage
const originator = new Originator('State 1');
const caretaker = new Caretaker();

// Save initial state
caretaker.addMemento(originator.save());

originator.setState('State 2');

// Save second state
caretaker.addMemento(originator.save());

originator.setState('State 3');
console.log('Current State:', originator.getState());

// Restore to the first state
const firstMemento = caretaker.getMemento(0);
if (firstMemento) {
  originator.restore(firstMemento);
  console.log('Restored State:', originator.getState());
}
