interface IVisitable<T> {
  accept(visitor: IVisitor<T>): IVisitable<T>;

  getCollection(): Array<T>;
}

interface IVisitor<T> {
  visit(v: Omit<IVisitable<T>, 'accept'>): void;
}

class LibraryBook {
  constructor(
    private readonly _title: string,
    private readonly _author: string,
  ) {
  }

  public printInfo(): void {
    console.log(`Author: ${this._author}, Title: ${this._title}`);
  }

  public get author(): string {
    return this._author;
  }
}


class BookShelf implements IVisitable<LibraryBook> {

  constructor(private readonly _collection: Array<LibraryBook>) {
  }

  public addBook(book: LibraryBook): this {
    this._collection.push(book);
    return this;
  }

  public accept(visitor: IVisitor<LibraryBook>): this {
    visitor.visit(this);
    return this;
  }

  public getCollection(): Array<LibraryBook> {
    return this._collection;
  }
}

class BookPrinterVisitor implements IVisitor<LibraryBook> {
  constructor() {
  }

  public visit(visitable: Omit<IVisitable<LibraryBook>, 'accept'>): void {
    const booksShelf = visitable.getCollection();
    booksShelf.forEach((b) => b.printInfo());
  }
}

class BookAuthorVisitor implements IVisitor<LibraryBook> {
  constructor() {
  }

  private sortByAuthor(books: Array<LibraryBook>): Array<LibraryBook> {
    return books.sort((f, s) => f.author.localeCompare(s.author));
  }

  public visit(visitable: Omit<IVisitable<LibraryBook>, 'accept'>): void {
    const booksShelf = this.sortByAuthor(visitable.getCollection());
    booksShelf.forEach((b) => console.log(b.author));
  }
}

const books = [
  new LibraryBook('123', 'Author 1'),
  new LibraryBook('456', 'Author 2'),
  new LibraryBook('789', 'Author 1'),
];
const collProvider = new BookShelf(books)
  .addBook(new LibraryBook('101112', 'Author 3'));

function applyBookVisitor<T extends IVisitable<LibraryBook>>
(bookShelf: T, visitor: IVisitor<LibraryBook>): void {
  bookShelf.accept(visitor);
}

const logVisitor = new BookPrinterVisitor();
const authorVisitor = new BookAuthorVisitor();

applyBookVisitor(collProvider, logVisitor);
applyBookVisitor(collProvider, authorVisitor);
