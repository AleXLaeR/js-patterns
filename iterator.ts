class Book {
  constructor(
    private readonly _title: string,
    private readonly _author: string,
  ) {
  }

  public print(): void {
    console.log(`Author: ${this._author}, Title: ${this._title}`);
  }
}

interface IIterator<TElement> {
  current: number;
  next(): TElement;
  hasNext(): boolean;
  rewind(): void;
}

interface IIterable<T> {
  getIterator(): IIterator<T>;
}

class Library implements IIterable<Book> {
  private _books = new Map<Book, number>();

  constructor(entries?: Map<Book, number>) {
    entries?.forEach((v, k) => this._books.set(k, v));
  }

  public get books() {
    return this._books;
  }

  public addBook(book: Book): Library {
    const amount = this._books.get(book);
    this._books.set(book, !!amount ? amount + 1 : 1);
    return this;
  }

  public getIterator(): IIterator<Book> {
    return new LibraryIterator(this);
  }
}

class LibraryIterator implements IIterator<Book> {
  private readonly _books: Array<Book> = [];
  public current: number = 0;

  constructor(library: Library) {
    for (const [book, amount] of library.books.entries()) {
      const books = Array(amount).fill(book);
      this._books = this._books.concat(books);
    }
  }

  public hasNext(): boolean {
    return this.current < this._books.length;
  }

  public next(): Book {
    return this._books[this.current++];
  }

  public rewind(): void {
    this.current = 0;
  }
}

const iterator = new Library()
  .addBook(new Book('Alex', '123'))
  .addBook(new Book('Alex', '456'))
  .addBook(new Book('Alex', '789'))
  .getIterator();


let current: Book | null = null;

while (iterator.hasNext()) {
  current = iterator.next();
  current.print();
}
