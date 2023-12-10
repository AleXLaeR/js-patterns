interface IMessageObserver {
  onMessage<TData>(data: TData): void | Promise<void>;
}

interface IMessageObservable<TObserver> {
  subscribe(observer: TObserver): this;

  unsubscribe(observer: TObserver): boolean;

  notifyAll<TData>(data: NonNullable<TData>): void;
}

class Observable<TObserver extends IMessageObserver>
  implements IMessageObservable<TObserver> {
  private _subscribers = new Set<TObserver>();

  constructor() {
  }

  public subscribe(observer: TObserver): this {
    this._subscribers.add(observer);
    return this;
  }

  public notifyAll<TData>(data: NonNullable<TData>): void {
    this._subscribers.forEach((o) => o.onMessage(data));
  }

  public unsubscribe(observer: TObserver): boolean {
    return this._subscribers.delete(observer);
  }

  public reset(): void {
    this._subscribers.clear();
  }
}

class LogObserver implements IMessageObserver {
  public onMessage<T>(data: T): void {
    const jsonString = JSON.stringify(data, null, 2);
    console.log(`[${this.constructor.name}] --- ${jsonString}`);
  }
}

class MessageBrokerObserver implements IMessageObserver {
  public async onMessage<T>(data: T): Promise<void> {
    const messageBroker = {
      ensureTopic: (topic: string) => Promise.resolve(true),
      publishTopic: (topic: string, data: T) => {
        console.log(`${data} has been published to the "${topic}" topic`);
        return Promise.resolve(null);
      },
    };

    await messageBroker.ensureTopic('message:hello');
    await messageBroker.publishTopic('message:hello', data);
  }
}

const mqObserver = new MessageBrokerObserver();
const logObserver = new LogObserver();

const observable = new Observable();
observable
  .subscribe(mqObserver)
  .subscribe(logObserver);

observable.notifyAll('Hello!');
observable.unsubscribe(mqObserver);

observable.notifyAll({
  message: 'Second Time!',
  from: 'Alex',
});

observable.reset();
observable.notifyAll('Third Time!');
