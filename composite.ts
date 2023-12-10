interface ICanvasComponent {
  render(): void;
}

// Leaf class (implements Graphic interface)
class PawnComponent implements ICanvasComponent {
  constructor(
    private readonly boardX: number,
    private readonly boardY: number,
  ) {
  }

  public render(): void {
    console.log(`Drawing Pawn at (${this.boardX}, ${this.boardY})`);
  }
}

// Leaf class (implements Graphic interface)
class BishopComponent implements ICanvasComponent {
  constructor(
    private readonly boardX: number,
    private readonly boardY: number,
  ) {
  }

  public render(): void {
    console.log(`Drawing Bishop at (${this.boardX}, ${this.boardY})`);
  }
}


interface ICompositeComponent extends ICanvasComponent {
  add(component: ICanvasComponent): void;
  addMany(...components: Array<ICanvasComponent>): void;

  remove(graphic: ICanvasComponent): void;
}


class GameBoardComponent implements ICompositeComponent {
  private _boardFigures: Array<ICanvasComponent> = [];

  public add(graphic: ICanvasComponent): void {
    this._boardFigures.push(graphic);
  }

  public addMany(...components: Array<ICanvasComponent>): void {
    components.forEach(this.add.bind(this));
  }

  public remove(graphic: ICanvasComponent): void {
    const index = this._boardFigures.lastIndexOf(graphic);

    if (index !== -1) {
      this._boardFigures.splice(index, 1);
    }
  }

  public render(): void {
    console.log('Chess Board: ');

    this._boardFigures.forEach((figure) => {
      figure.render();
    });
  }
}

// Individual components (leaves)
const pawn1 = new PawnComponent(1, 2);
const pawn2 = new PawnComponent(3, 4);
const bishop = new BishopComponent(5, 6);

// Composite component (branch)
const gameBoard = new GameBoardComponent;

// Attaching leaves to the branch, forming a composite tree
gameBoard.addMany(pawn1, pawn2, bishop);

// Draw the tree, which in turn draws its leaves
gameBoard.render();
