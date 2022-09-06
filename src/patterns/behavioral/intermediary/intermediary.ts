enum CommandTypes {
  CLICK = 'click',
  DOUBLE_CLICK = 'double_click',
}

interface Intermediary {
  notify: (sender: BaseElement, type: CommandTypes) => void;
}

class SpecificIntermediary implements Intermediary {
  private button: Button;
  private checkbox: Checkbox;

  constructor(button: Button, checkbox: Checkbox) {
    button.setIntermediary(this);
    checkbox.setIntermediary(this);
    this.button = button;
    this.checkbox = checkbox;
  }

  notify(sender, type) {
    if (sender instanceof Button) {
      if (type === CommandTypes.CLICK) {
        this.checkbox.reactTo('button click');
      }

      if (type === CommandTypes.DOUBLE_CLICK) {
        this.checkbox.reactTo('button double click');
      }
    }

    if (sender instanceof Checkbox) {
      if (type === CommandTypes.CLICK) {
        this.button.reactTo('checkbox click');
      }

      if (type === CommandTypes.DOUBLE_CLICK) {
        this.button.reactTo('checkbox double click');
      }
    }
  }
}

interface IElement {
  onClick: () => void;
  onDoubleClick: () => void;
  reactTo: (message: string) => void;
}

class BaseElement implements IElement {
  protected intermediary: Intermediary;
  protected componentName: string;

  setIntermediary(i: Intermediary) {
    this.intermediary = i;

    return this;
  }

  setName(name: string) {
    this.componentName = name;

    return this;
  }

  onClick() {
    if (this.intermediary) {
      this.intermediary.notify(this, CommandTypes.CLICK);
    }
  }
  onDoubleClick() {
    if (this.intermediary) {
      this.intermediary.notify(this, CommandTypes.DOUBLE_CLICK);
    }
  }

  reactTo(event: string) {
    console.log(`${this.componentName} reacts to event: ${event}`);
  }
}

class Button extends BaseElement {}

class Checkbox extends BaseElement {}

const button = new Button().setName('First Button');
const checkbox = new Checkbox().setName('First Checkbox');

const intermediary = new SpecificIntermediary(button, checkbox);

button.onClick();
checkbox.onDoubleClick();
