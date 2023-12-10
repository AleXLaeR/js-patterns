/*
The CharacterFlyweight interface defines the common operation, which is rendering the character at a given position. The CharacterModel class implements this interface and represents the shared flyweight object. The CharacterFlyweightFactory is responsible for managing and creating flyweight objects.
The Character class represents the unshared concrete flyweight and contains the extrinsic properties of the character. The client code creates instances of the Character class, and even though some characters share the same intrinsic properties (e.g., sprite and animation), they are separate objects with unique extrinsic properties.
This pattern allows for efficient memory usage by reusing shared flyweight objects and storing only the unique extrinsic properties in the unshared concrete flyweight instances.
 */

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

  public getCharacterModel(sprite: string, animation: string): CharacterFlyweight {
    const key = `${sprite}_${animation}`;

    if (!this.flyweights[key]) {
      this.flyweights[key] = new CharacterModel(sprite, animation);
    }

    return this.flyweights[key];
  }
}

class Sprite {
  private readonly sprite: string;
  private readonly animation: string;

  constructor(sprite: string, animation: string) {
    this.sprite = sprite;
    this.animation = animation;
  }

  getSprite(): string {
    return this.sprite;
  }

  getAnimation(): string {
    return this.animation;
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
