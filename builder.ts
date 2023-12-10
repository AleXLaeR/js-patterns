
interface IDbConnection {
}

interface IConnectionInitStage {
  build(): IDbConnection;
}

interface ICredsSelectionStage {
  asUser(user?: string): ICredsSelectionStage;
  withPassword(password?: string): IConnectionInitStage;
}

interface IDatabaseSelectionStage {
  forDatabase(database?: string): ICredsSelectionStage;
}

interface IHostSelectionStage {
  forHostOrServer(hostOrServer: string): IDatabaseSelectionStage;
}

class FluentDbConnection implements
  IHostSelectionStage,
  IDatabaseSelectionStage,
  ICredsSelectionStage,
  IConnectionInitStage
{
  private _host?: string;
  private _user?: string;
  private _password?: string;
  private _database?: string;

  private constructor() {
  }

  public static createConnection(): IHostSelectionStage {
    return new FluentDbConnection();
  }

  public build(): IDbConnection {
    return this as unknown as IDbConnection;
  }

  public asUser(user?: string): ICredsSelectionStage {
    this._user = user;
    return this;
  }

  public forDatabase(database?: string): ICredsSelectionStage {
    this._database = database;
    return this;
  }

  public forHostOrServer(hostOrServer: string): IDatabaseSelectionStage {
    this._host = hostOrServer;
    return this;
  }

  public withPassword(password?: string): IConnectionInitStage {
    this._password = password;
    return this;
  }
}

const connection = FluentDbConnection
  .createConnection()
  .forHostOrServer('0.0.0.0')
  .forDatabase('database')
  .asUser('alex')
  .withPassword('password')
  .build();

console.log(connection);
