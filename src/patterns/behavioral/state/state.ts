interface DocumentState {
  publish: () => void;
}

interface IDocument {
  publish: () => void;
  setState: (state: DocumentState) => void;
  isAdmin: () => boolean;
}

type User = {
  isAdmin: boolean;
};

class SpecificDocument implements IDocument {
  private state: DocumentState;
  private user: User;

  constructor() {
    this.state = new DraftState(this);
  }

  setUser(user: User) {
    this.user = user;
  }

  publish() {
    this.state.publish();
  }

  setState(state: DocumentState) {
    this.state = state;
  }

  getState() {
    return this.state.constructor.name;
  }

  isAdmin() {
    return this.user.isAdmin;
  }
}

class BaseState {
  protected document: IDocument;

  constructor(doc: IDocument) {
    this.document = doc;
  }
}

class DraftState extends BaseState implements DocumentState {
  publish() {
    if (this.document.isAdmin()) {
      return this.document.setState(new PublishedState(this.document));
    }

    return this.document.setState(new ModerationState(this.document));
  }
}

class ModerationState extends BaseState implements DocumentState {
  publish() {
    return this.document.setState(new PublishedState(this.document));
  }
}

class PublishedState extends BaseState implements DocumentState {
  publish() {
    return null;
  }
}

const firstDoc = new SpecificDocument();
const secondDoc = new SpecificDocument();

const admin: User = {
  isAdmin: true,
};
const regularUser: User = {
  isAdmin: false,
};

firstDoc.setUser(admin);
secondDoc.setUser(regularUser);

firstDoc.publish();
secondDoc.publish();

console.log(firstDoc.getState());
console.log(secondDoc.getState());

secondDoc.publish();

console.log(secondDoc.getState());
