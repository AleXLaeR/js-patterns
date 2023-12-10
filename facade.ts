// Subsystem A
class Engine {
  start(): void {
    console.log('Engine started');
  }

  stop(): void {
    console.log('Engine stopped');
  }
}

// Subsystem B
class AirConditioning {
  turnOn(): void {
    console.log('Air conditioning turned on');
  }

  turnOff(): void {
    console.log('Air conditioning turned off');
  }
}

// Subsystem C
class FuelSystem {
  pumpFuel(): void {
    console.log('Fuel pumped');
  }

  stopFuelPump(): void {
    console.log('Fuel pump stopped');
  }
}



class CarFacade {
  private readonly _carEngine: Engine;
  private readonly _ac: AirConditioning;
  private readonly _fuelSystem: FuelSystem;

  constructor() {
    this._carEngine = new Engine();
    this._ac = new AirConditioning();
    this._fuelSystem = new FuelSystem();
  }

  startCar(): void {
    this._fuelSystem.pumpFuel();
    this._carEngine.start();
    this._ac.turnOn();

    console.log('Car started.');
  }

  public stopCar(): void {
    this._carEngine.stop();
    this._fuelSystem.stopFuelPump();
    this._ac.turnOff();

    console.log('Car stopped.');
  }
}


const carFacade = new CarFacade;

try {
  carFacade.startCar();
} finally {
  carFacade.stopCar();
}

function cache() {
  const storage = new Map();
}
