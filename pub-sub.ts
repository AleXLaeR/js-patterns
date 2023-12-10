
type UnsubFunction = () => boolean;
type Listener<TEvent> = (ev: TEvent) => void;

type PubEvent = Record<PropertyKey, string> | string;

interface IPubSub<TEvent> {
  subscribe: (cb: Listener<TEvent>) => UnsubFunction;
  publish: (message: TEvent) => void;
}

class PubSub<TEvent extends PubEvent> implements IPubSub<TEvent> {
  // @ts-ignore
  private _listeners: Set<Listener<TEvent>> = new Set();

  constructor() {
  }

  public subscribe(cb: Listener<TEvent>): UnsubFunction {
    this._listeners.add(cb);
    return () => this._remove(cb);
  }

  public publish(message: TEvent): void {
    this._listeners.forEach((l) => l(message));
  }

  private _remove(cb: Listener<TEvent>): boolean {
    return this._listeners.delete(cb);
  }
}

const pubSub = new PubSub();

const unSubFirst = pubSub.subscribe(console.log);
pubSub.subscribe((d) => console.log(d));

pubSub.publish({ message: 'Hello!' });
unSubFirst();
pubSub.publish({ message: 'World!' });
