interface IOrderProcessingChain<TOrder extends Order = Order> {
  handleOrder(order: TOrder): Promise<void> | void;

  setNext<TStaff extends KitchenStaff>(lineProcessor: TStaff): TStaff;

  establishPipeline(...processors: Array<KitchenStaff>): void;
}

enum OrderType {
  SUSHI = 'sushi',
  DESSERT = 'dessert',
  SPECIAL = 'special meal',
}

class Order {
  private _grandTotal = 0;
  protected _isFinished = false;

  constructor(public readonly _type: OrderType) {}

  public get grandTotal(): number {
    return this._grandTotal;
  }

  public addPrice(amount: number): void {
    this._grandTotal += amount;
  }

  public get isFinished(): boolean {
    return this._isFinished;
  }

  public finish(): void {
    this._isFinished = true;
  }
}

class SpecialMealOrder extends Order {
  constructor() {
    super(OrderType.SPECIAL);
  }
}

abstract class KitchenStaff implements IOrderProcessingChain {
  constructor(protected _nextHandler?: KitchenStaff) {}

  public setNext<TStaff extends KitchenStaff>(lineProcessor: TStaff): TStaff {
    this._nextHandler = lineProcessor;
    return lineProcessor;
  }

  public establishPipeline(...processors: Array<KitchenStaff>): void {
    let currentProcessor = this._nextHandler ?? this as KitchenStaff;

    for (const processor of processors) {
      currentProcessor.setNext(processor);
      currentProcessor = processor;
    }
  }

  public abstract handleOrder(order: Order): void;
}

class SushiChef extends KitchenStaff {
  public handleOrder(order: Order): void {
    if (order._type === OrderType.SUSHI) {
      console.log("[SUSHI CHEF] Sushi is being cooked");
      order.addPrice(1000);
      order.finish();
    }
    this._nextHandler?.handleOrder(order);
  }
}

class MasterChef extends KitchenStaff {
  public handleOrder(order: Order): void {
    if (order._type === OrderType.SPECIAL) {
      console.log("[MASTER CHEF] Special meal is being prepared");
      order.addPrice(5000);
      order.finish();
    }
    this._nextHandler?.handleOrder(order);
  }
}

class DessertChef extends KitchenStaff {
  public handleOrder(order: Order): void {
    if (order._type === OrderType.DESSERT) {
      console.log("[DESSERT CHEF] Dessert is being prepared");
      order.addPrice(2000);
      order.finish();
    }
    this._nextHandler?.handleOrder(order);
  }
}

class Waiter extends KitchenStaff {
  public handleOrder(order: Order): void {
    if (order.isFinished) {
      console.log("[WAITER] The order is ready");

      const timeout = setTimeout(() => {
        console.log(`[WAITER] The total for ${order._type} is ${order.grandTotal}`);
        clearTimeout(timeout);
      }, 2000);

      return;
    }
    this._nextHandler?.handleOrder(order);
  }
}

const masterChef = new MasterChef;
const sushiChef = new SushiChef

const dessertChef = new DessertChef;
const waiter = new Waiter;

sushiChef.establishPipeline(dessertChef, masterChef, waiter);
sushiChef.handleOrder(new Order(OrderType.SPECIAL));