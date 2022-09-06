interface Sender {
  send: (text: string) => void;
}

class BaseSender implements Sender {
  send(text) {
    console.log(`BASE SENDER: ${text}`);
  }
}

class BaseDecorator implements Sender {
  private sender: Sender;

  constructor(sender: Sender) {
    this.sender = sender;
  }

  send(text) {
    // decorate here
    this.sender.send(text);
  }
}

class ExtraSenderDecorator extends BaseDecorator {
  constructor(sender: Sender) {
    super(sender);
  }

  send(text) {
    this.extraSend(text);
    super.send(text);
  }

  extraSend(text) {
    console.log(`EXTRA SENDER: ${text}`);
  }
}

class SuperSenderDecorator extends BaseDecorator {
  constructor(sender: Sender) {
    super(sender);
  }

  send(text) {
    this.superSend(text);
    super.send(text);
  }

  superSend(text) {
    console.log(`SUPER SENDER: ${text}`);
  }
}

console.log('Simple sender');
const simpleSender = new BaseSender();
simpleSender.send('Here I am, I am base');
console.log('--------------------------------------');

console.log('Super Sender');
const extraSenderDecorator = new ExtraSenderDecorator(simpleSender);

const superSenderDecorator = new SuperSenderDecorator(extraSenderDecorator);

superSenderDecorator.send('HAHAH, I am SUPER');
