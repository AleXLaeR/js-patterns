interface ICloneable<T> {
  clone(): T;
}

class Address implements ICloneable<Address> {
  constructor(
    public _street: string,
    public _city: string,
    public _suite: number,
  ) {}

  public clone(): Address {
    // return Object.create(this);

    return new Address(this._street, this._city, this._suite);
  }
}

class PersonRecord implements ICloneable<PersonRecord> {
  private _name: string;
  private _address: Address;

  constructor(name: string, address: Address);
  constructor(source: PersonRecord);

  constructor(source: string | PersonRecord, address?: Address) {
    if (typeof source === 'string') {
      this._name = source;
      this._address = address!;
    } else {
      this._name = source._name;
      this._address = source._address.clone();
    }
  }

  public clone(): PersonRecord {
    // const person = Object.create(this);
    // person._address = Object.assign({}, this._address);
    // return person;

    return new PersonRecord(this);
  }

  public get address() {
    return this._address;
  }
}


const address = new Address('Some Street', 'Kharkov', 53);

const person = new PersonRecord('Alex', address);
const person2 = new PersonRecord(person);

const clone = person2.clone();
clone.address._city = 'Kiev';

console.log(person2.address._city);
console.log(clone.address._city);
