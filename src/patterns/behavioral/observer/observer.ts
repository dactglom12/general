interface IService {
  attach: (subscriber: Subscriber) => void;
  detach: (subscriber: Subscriber) => void;
  notify: () => void;
}

interface WithId {
  getId: () => string;
}

interface Subscriber extends WithId {
  update: (s: IService) => void;
}

type UserData = {
  name: string;
  surname: string;
  age: number;
  address: string;
};

class UserService implements IService {
  private subscribers: Map<string, Subscriber>;
  private userData: UserData;

  constructor(user: UserData) {
    this.userData = user;
    this.subscribers = new Map();
  }

  getUserData() {
    return this.userData;
  }

  setUserData(user: Partial<UserData>) {
    this.userData = { ...this.userData, ...user };

    this.notify();
  }

  attach(subscriber: Subscriber) {
    if (this.subscribers.has(subscriber.getId())) {
      throw new Error(`Already subscribed: ${subscriber.getId()}`);
    }

    this.subscribers.set(subscriber.getId(), subscriber);
  }

  detach(subscriber: Subscriber) {
    if (!this.subscribers.has(subscriber.getId())) {
      throw new Error(`Subscriber not found: ${subscriber.getId()}`);
    }

    this.subscribers.delete(subscriber.getId());
  }

  notify() {
    this.subscribers.forEach((sub) => {
      sub.update(this);
    });
  }
}

class UserSubscriber implements Subscriber {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  update(s: UserService) {
    console.log(`Whoah, something has changed, my id: ${this.getId()}`);
    console.log(`${JSON.stringify(s.getUserData())}`);
  }
}

const [subscriber1, subscriber2] = ['1', '2'].map((id) => {
  return new UserSubscriber(id);
});

const initialUserData: UserData = {
  address: 'Brighton Beach, 2nd block',
  age: 20,
  name: 'Andrew',
  surname: 'Johnson',
};

const userService = new UserService(initialUserData);

userService.attach(subscriber1);
userService.attach(subscriber2);

console.log(userService.getUserData());
console.log('Today is my birthday!');
userService.setUserData({ age: userService.getUserData().age + 1 });
