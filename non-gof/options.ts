
interface IDbConnection {
  connect(): boolean;
}

type DbConnectionOptions = {
  _host: string;
  _user?: string;
  _password: string;
  _database?: string;
};

class FluentDatabaseConnection implements IDbConnection {
  private readonly _host?: string;
  private readonly _user?: string = 'admin';
  private readonly _password?: string = 'admin';
  private readonly _database?: string;

  constructor(cb?: (opts: DbConnectionOptions) => void) {
    cb?.(this as unknown as DbConnectionOptions);
  }

  public connect(): boolean {
    return true;
  }
}

const conn = new FluentDatabaseConnection((opts) => {
  opts._user = 'Alex';
});
console.log(conn);
