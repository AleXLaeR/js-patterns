interface IBaseCommand {
  execute(): void;

  undo(): void;
}

abstract class AbstractCommand implements IBaseCommand {
  protected constructor(protected readonly _editor: TextEditorReceiver) {
  }

  public undo(): void {
    this._editor.reset();
  }


  public abstract execute(): void;
}

class ConcreteBoldCommand extends AbstractCommand {
  constructor(_editor: TextEditorReceiver) {
    super(_editor);
  }

  public execute(): void {
    this._editor.makeBold();
  }

  public undo(): void {
    this._editor.removeBold();
  }
}

class ConcreteItalicCommand extends AbstractCommand {
  constructor(_editor: TextEditorReceiver) {
    super(_editor);
  }

  public execute(): void {
    this._editor.makeItalic();
  }

  public undo(): void {
    this._editor.removeItalic();
  }
}


class TextEditorReceiver {
  private readonly _initialState: string;

  constructor(private _textContent: string = '') {
    this._initialState = _textContent;
  }

  public reset(): void {
    this._textContent = this._initialState;
  }

  public makeBold(): void {
    this._textContent = `<b>${this._textContent}</b>`;
  }

  public removeBold(): void {
    this._textContent = this._textContent.replace(/<b>(.*?)<\/b>/g, '$1');
  }

  public makeItalic(): void {
    this._textContent = `<i>${this._textContent}</i>`;
  }

  public removeItalic(): void {
    this._textContent = this._textContent.replace(/<i>(.*?)<\/i>/g, '$1');
  }

  getText(): string {
    return this._textContent;
  }
}

class CommandInvoker {
  private _commandHistory: Array<IBaseCommand> = [];

  public applyCommand(command: IBaseCommand): void {
    command.execute();
    this._commandHistory.push(command);
  }

  public undo(): void {
    if (this._commandHistory.length === 0) return;

    const lastCommand = this._commandHistory.pop();
    lastCommand?.undo();
  }
}



const editor = new TextEditorReceiver('abc');
const invoker = new CommandInvoker;

invoker.applyCommand( new ConcreteBoldCommand(editor));
console.log(editor.getText());

invoker.applyCommand(new ConcreteItalicCommand(editor));
console.log(editor.getText());

invoker.undo();
console.log(editor.getText());

invoker.undo();
console.log(editor.getText());
