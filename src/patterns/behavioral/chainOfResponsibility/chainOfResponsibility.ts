interface Handler {
  handle: (request: any) => string;
  setNext: (handler: Handler) => void;
}

abstract class AbstractHandler implements Handler {
  private next: Handler;

  setNext(next: Handler) {
    this.next = next;

    return next;
  }

  handle(request) {
    if (this.next) {
      return this.next.handle(request);
    }

    return "";
  }
}

class MonkeyHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public handle(request: string): string {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

function clientCode(handler: Handler) {
  const foods = ["Nut", "Banana", "Cup of coffee"];

  for (const food of foods) {
    console.log(`Client: Who wants a ${food}?`);

    const result = handler.handle(food);
    if (result) {
      console.log(`${result}`);
    } else {
      console.log(`${food} was left untouched.`);
    }
  }
}

clientCode(monkey);
console.log("---------------------");
clientCode(dog);
