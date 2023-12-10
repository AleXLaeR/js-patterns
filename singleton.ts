const SingletonModule = (() => {
    let _instance: any | null = null;

    class ProtectedClass {
    }

    function getInstance() {
      if (!_instance) {
        _instance = new ProtectedClass();
      }
      return _instance;
    }

    return { get: getInstance };
  }
)();

class DatabaseConnector {
  public getAll(): number[] {
    return [1, 2, 3];
  }

  public makeQuery(rawSql: string): number[] {
    const result = [0, 5, 10];
    // ...
    return result;
  }

  public getAllBy(predicate?: (v: number) => boolean): number[] {
    return predicate ? this.getAll().filter(predicate) : this.getAll();
  }
}

class SingletonDatabase {
  private static _instance: DatabaseConnector | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnector {
    if (!this._instance) {
      this._instance = new DatabaseConnector();
    }
    return this._instance;
  }
}



const database = SingletonDatabase.getInstance();
console.log(database.makeQuery('some query...').join(', '));



class DatabaseMultiton {
  private static _instances: Record<PropertyKey, DatabaseConnector> = {};

  private constructor() {}

  static getInstance(key: string | number): DatabaseConnector {
    if (!this._instances[key]) {
      this._instances[key] = new DatabaseConnector();
    }
    return this._instances[key];
  }
}
