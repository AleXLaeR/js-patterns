// Interface for subjects
interface ICompObservable<TObserver extends ICompObserver> {
  addObserver(observer: TObserver): this;
  removeObserver(observer: TObserver): void;
  notifyAll<TData>(data: TData): void;
}

// Interface for observers
interface ICompObserver {
  update<TData>(data: TData): void | Promise<void>;
}

// Observer registry
class ObserverRegistry<T extends ICompObserver> implements ICompObservable<T> {
  private observers = new Set<T>();

  addObserver(observer: T): this {
    this.observers.add(observer);
    return this;
  }

  removeObserver(observer: T): void {
    this.observers.delete(observer);
  }

  notifyAll<T>(data: T): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

// Concrete subject
class ConcreteSubject<T extends ICompObserver> implements ICompObservable<T> {
  private registry = new ObserverRegistry<T>();

  public addObserver(observer: T): this {
    this.registry.addObserver(observer);
    return this;
  }

  public removeObserver(observer: T): void {
    this.registry.removeObserver(observer);
  }

  public notifyAll(data: any): void {
    this.registry.notifyAll(data);
  }
}


class ConcreteObserver implements ICompObserver {
  public update(data: any): void {
    console.log(`${this.constructor.name} received data: ${data}`);
  }
}

class ConcreteObserver2 implements ICompObserver {
  public update(data: any): void {
    console.log(`${this.constructor.name} received data: ${data}`);
  }
}


// Composite observer
class CompositeObserver implements ICompObserver {
  private observers = new Set<ICompObserver>();
  private static _instance: CompositeObserver;

  private constructor() {}

  static get instance(): CompositeObserver {
    if (!this._instance) {
      this._instance = new CompositeObserver();
    }
    return this._instance;
  }

  public addObserver(observer: ICompObserver): void {
    this.observers.add(observer);
  }

  public removeObserver(observer: ICompObserver): void {
    this.observers.delete(observer);
  }

  public update(data: any): void {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}

// Example usage
const subject = new ConcreteSubject();

const observer1: ConcreteObserver = new ConcreteObserver();
const observer2: ConcreteObserver2 = new ConcreteObserver2();

const compositeObserver: CompositeObserver = CompositeObserver.instance;
compositeObserver.addObserver(observer1);
compositeObserver.addObserver(observer2);

subject.addObserver(compositeObserver);

subject.notifyAll("Hello, World!");
