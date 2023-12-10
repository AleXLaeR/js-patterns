// Flyweight interface
interface CharacterFlyweight {
  render(position: { x: number; y: number }): void;
}

// Concrete Flyweight class
class CharacterModel implements CharacterFlyweight {
  private readonly sprite: string;
  private readonly animation: string;

  constructor(sprite: string, animation: string) {
    this.sprite = sprite;
    this.animation = animation;
  }

  render(position: { x: number; y: number }): void {
    console.log(`Rendering character with sprite ${this.sprite}, animation ${this.animation} at position (${position.x}, ${position.y})`);
  }
}

// Flyweight factory
class CharacterFlyweightFactory {
  private flyweights: { [key: string]: CharacterFlyweight } = {};

  getCharacterModel(sprite: string, animation: string): CharacterFlyweight {
    const key = `${sprite}_${animation}`;

    if (!this.flyweights[key]) {
      this.flyweights[key] = new CharacterModel(sprite, animation);
    }

    return this.flyweights[key];
  }
}

// Unshared Concrete Flyweight class
class Character {
  private position: { x: number; y: number };
  private health: number;
  private characterFlyweight: CharacterFlyweight;

  constructor(sprite: string, animation: string, position: { x: number; y: number }, health: number, flyweightFactory: CharacterFlyweightFactory) {
    this.position = position;
    this.health = health;
    this.characterFlyweight = flyweightFactory.getCharacterModel(sprite, animation);
  }

  render(): void {
    this.characterFlyweight.render(this.position);
    console.log(`Health: ${this.health}`);
  }
}

// Client code
const flyweightFactory = new CharacterFlyweightFactory();

const character1 = new Character("warrior", "attack", { x: 10, y: 20 }, 100, flyweightFactory);
const character2 = new Character("mage", "spellcast", { x: 30, y: 40 }, 80, flyweightFactory);
const character3 = new Character("warrior", "attack", { x: 50, y: 60 }, 120, flyweightFactory);

character1.render();
character2.render();
character3.render();
