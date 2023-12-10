// Abstract class defining the template method
abstract class HouseTemplate {
  // Template method defining the algorithm
  buildHouse(): void {
    this.layFoundation();
    this.buildFrame();
    this.addWalls();
    this.addRoof();
  }

  // Abstract methods to be implemented by subclasses
  abstract layFoundation(): void;
  abstract buildFrame(): void;
  abstract addWalls(): void;
  abstract addRoof(): void;
}

// Concrete subclass 1
class WoodenHouse extends HouseTemplate {
  layFoundation(): void {
    console.log("Laying wooden foundation");
  }

  buildFrame(): void {
    console.log("Building wooden frame");
  }

  addWalls(): void {
    console.log("Adding wooden walls");
  }

  addRoof(): void {
    console.log("Adding wooden roof");
  }
}

// Concrete subclass 2
class BrickHouse extends HouseTemplate {
  layFoundation(): void {
    console.log("Laying brick foundation");
  }

  buildFrame(): void {
    console.log("Building brick frame");
  }

  addWalls(): void {
    console.log("Adding brick walls");
  }

  addRoof(): void {
    console.log("Adding brick roof");
  }
}

// Client code
const woodenHouse = new WoodenHouse();
woodenHouse.buildHouse();

const brickHouse = new BrickHouse();
brickHouse.buildHouse();
