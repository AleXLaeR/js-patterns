/*
  Мост — это структурный паттерн проектирования,
  который разделяет один или несколько классов на
  две отдельные иерархии — абстракцию и реализацию,
  позволяя изменять их независимо друг от друга.
 */

interface IDamageable {
  takeDamage(amount: number): boolean;

  get isAlive(): boolean;
}

interface IAttacker {
  attack(target: IDamageable): boolean;
}

interface IObserver<TData> {
  onMessage(data: TData): void;
}

interface IObservable<TData> {
  subscribe(observer: IObserver<TData>): () => boolean;

  notifyAll(data: TData): void;
}

type NotificationPayload = { from: string } & {
  type: 'attack';
  damageInflicted: number;
} | {
  type: 'defense';
  damageReceived: number;
};

interface IRenderer<TData> {
  render(data: TData): void;
}

interface IWeapon {
  getDamage(): number;
}

class Knife implements IWeapon {
  constructor(private readonly _damage: number) {
  }

  public getDamage(): number {
    return this._damage;
  }
}

abstract class Entity implements IObservable<NotificationPayload> {
  // @ts-ignore
  protected _subscribers: Set<IObserver<NotificationPayload>> = new Set();

  protected constructor(
    protected _name: string,
    protected _hp: number = 500,
  ) {
  }

  public notifyAll(data: NotificationPayload): void {
    this._subscribers.forEach((o) => o.onMessage(data));
  }

  public subscribe(observer: IObserver<NotificationPayload>): () => boolean {
    this._subscribers.add(observer);
    return () => this._subscribers.delete(observer);
  }
}

class Player extends Entity implements IAttacker {
  constructor(name: string, private readonly _weapon: IWeapon) {
    super(name);
  }

  public attack(target: IDamageable): boolean {
    const weaponDamage = this._weapon.getDamage();
    const attackResult = target.takeDamage(weaponDamage);


    this.notifyAll({
      type: 'attack',
      damageInflicted: weaponDamage,
      from: this._name,
    });
    return attackResult;
  }
}

class Monster extends Entity implements IDamageable {
  constructor(name: string) {
    super(name);
  }

  public takeDamage(amount: number): boolean {
    this._hp -= amount;
    return this.isAlive;
  }

  public get isAlive(): boolean {
    return this._hp > 0;
  }
}

class ConsoleRenderer implements IRenderer<NotificationPayload> {
  constructor() {
  }

  public render(data: NotificationPayload): void {
    console.log(data);
  }
}

enum EntityType {
  PLAYER = 'Player',
  MONSTER = 'Monster',
}

class EntityFactory {
  private static _playerCount = 0;
  private static _monsterCount = 0;

  private constructor() {
  }

  public static construct(type: EntityType): Entity {
    switch (type) {
      case EntityType.PLAYER:
        this._playerCount++;
        return new Player(`Player ${this._playerCount}`, new Knife(50));
      case EntityType.MONSTER:
        this._monsterCount++;
        return new Monster(`Monster ${this._monsterCount}`);
    }
  }
}

class GameWatcher implements IObserver<NotificationPayload> {

  constructor(private readonly _renderer: IRenderer<NotificationPayload>) {
  }

  public play(): void {
    const player = EntityFactory.construct(EntityType.PLAYER) as Player;
    const monster = EntityFactory.construct(EntityType.MONSTER) as Monster;
    const monster2 = EntityFactory.construct(EntityType.MONSTER) as Monster;

    player.subscribe(this);
    player.attack(monster);
    player.attack(monster2);
  }

  public onMessage(data: NotificationPayload): void {
    console.log('Rendering the received data.');
    this._renderer.render(data);
  }
}

const gameRenderer = new ConsoleRenderer;
const game = new GameWatcher(gameRenderer);
game.play();

