interface IEmailSender {
  send(content: string): void;
}

class EmailSender implements IEmailSender {
  constructor() {
  }

  public send(content: string): void {
    console.log('Sending email...');
    setTimeout(() => {
      console.log('Email was delivered!');
    }, 5e3);
  }
}

class EmailSenderDecorator extends EmailSender {
  constructor(protected readonly _decorator?: IEmailSender) {
    super();
  }

  public send(content: string) {
    this._decorator?.send(content);
  }
}

class ParticipantsDecorator extends EmailSenderDecorator {
  constructor(
    private readonly _from: string,
    private readonly _to: string,
    ) {
    super();
  }

  public send(content: string) {
    console.log(`Email is assigned to ${this._to} from ${this._from}`);
    super.send(content);
  }
}

class SignedDecorator extends EmailSenderDecorator {
  constructor(decorator: IEmailSender) {
    super(decorator);
  }

  public send(content: string) {
    super.send(content);
    console.log('Securely signed the email!');
  }
}

const partsDecorator = new ParticipantsDecorator('1', '2');
const signedDecorator = new SignedDecorator(partsDecorator);
signedDecorator.send('123');
