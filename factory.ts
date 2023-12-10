

const enum WeaponClass {
  MELEE = 100,
  RANGE = 200,
}

const enum ArmorClass {
  WRETCH = 50,
  WARRIOR = 500,
}

abstract class Weapon {
  protected constructor(protected readonly _damage: number) {
  }
}

abstract class Armor {
  protected constructor(
    protected readonly _protection: number,
    protected readonly _changeToDodge: number,
  ) {
  }
}

class WretchArmor extends Armor {
  constructor() {
    super(ArmorClass.WRETCH, ArmorClass.WRETCH / 100);
  }
}

class WarriorArmor extends Armor {
  constructor() {
    super(ArmorClass.WARRIOR, ArmorClass.WARRIOR / 100);
  }
}
class Gun extends Weapon {
  constructor() {
    super(WeaponClass.RANGE);
  }
}

class Sword extends Weapon {
  constructor() {
    super(WeaponClass.MELEE);
  }
}

class Axe extends Weapon {
  constructor(additionalDamage: number) {
    super(WeaponClass.MELEE + additionalDamage);
  }
}

interface IEntityFactory
{
  constructWeapon(weaponClass: WeaponClass, requiredDamage?: number): Weapon;
  constructArmor(armorClass: ArmorClass): Armor;
}

class PlayerFactory implements IEntityFactory {
  public constructArmor(armorClass: ArmorClass): Armor {
    switch (armorClass) {
      case ArmorClass.WRETCH:
        return new WretchArmor();
      case ArmorClass.WARRIOR:
        return new WarriorArmor();
    }
  }

  public constructWeapon(weaponClass: WeaponClass, requiredDamage: number = 0): Weapon {
    if (weaponClass === WeaponClass.MELEE) {
      if (requiredDamage > 50) {
        return new Axe(requiredDamage - WeaponClass.MELEE);
      }
      return new Sword();
    }
    return new Gun();
  }
}

abstract class GameEntity {
  protected _weapon?: Weapon;
  protected _armor?: Armor;

  protected constructor(
    protected readonly _name: string,
    protected readonly _health: number,
  ) {
  }

  public getInfo(): string {
    return `${this._name} (${this._health})`;
  }
}

class Berserk extends GameEntity {
  constructor(
    health: number,
    private readonly _factory: IEntityFactory,
    ) {
    super('Alex Berserk', health);
    this._weapon = _factory.constructWeapon(WeaponClass.MELEE, 100);
    this._armor = _factory.constructArmor(ArmorClass.WARRIOR);
  }
}

class Archer extends GameEntity {
  constructor(private readonly _factory: IEntityFactory) {
    super('Diana Archer', 100);
    this._weapon = _factory.constructWeapon(WeaponClass.RANGE);
    this._armor = _factory.constructArmor(ArmorClass.WRETCH);
  }
}

const factory = new PlayerFactory();

const archer = new Archer(factory);
const berserk = new Berserk(500, factory);

console.log(archer.getInfo(), berserk.getInfo());
