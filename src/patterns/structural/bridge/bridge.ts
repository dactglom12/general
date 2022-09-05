// abstraction
interface IRemote {
  togglePower: () => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  nextChannel: () => void;
  previousChannel: () => void;
}

interface IAdvancedRemote extends IRemote {
  mute: () => void;
}

// realisation
interface IDevice {
  isEnabled: () => boolean;
  setVolume: (percentage: number) => void;
  disable: () => void;
  enable: () => void;
  setChannel: (channel: number) => void;
  getChannel: () => number;
  getVolume: () => number;
}

// specific abstraction
class SimpleRemote implements IRemote {
  private device: IDevice;

  constructor(device: IDevice) {
    this.device = device;
  }

  disabledGuard(func: Function) {
    if (!this.device.isEnabled()) {
      throw new Error("Device is off, turn it on first");
    }

    func();
  }

  changeDevice(device: IDevice) {
    this.device = device;
  }

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  decreaseVolume() {
    this.disabledGuard(() =>
      this.device.setVolume(this.device.getVolume() - 10)
    );
  }

  nextChannel() {
    this.disabledGuard(() =>
      this.device.setChannel(this.device.getChannel() + 1)
    );
  }

  increaseVolume() {
    this.disabledGuard(() =>
      this.device.setVolume(this.device.getVolume() + 10)
    );
  }

  previousChannel() {
    this.disabledGuard(() =>
      this.device.setChannel(this.device.getChannel() - 1)
    );
  }

  getDeviceState() {
    return this.device;
  }
}

// specific realisation

const defaultVolume = 50;
const defaultChannel = 1;
const defaultEnabledState = false;

class TV implements IDevice {
  private enabled: boolean;
  private volume: number;
  private channel: number;

  constructor() {
    this.enabled = defaultEnabledState;
    this.volume = defaultVolume;
    this.channel = defaultChannel;
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  isEnabled() {
    return this.enabled;
  }

  setVolume(percentage: number) {
    this.volume = percentage;
  }

  setChannel(channel: number) {
    this.channel = channel;
  }

  getChannel() {
    return this.channel;
  }

  getVolume() {
    return this.volume;
  }
}

const device = new SimpleRemote(new TV());

device.togglePower();
device.increaseVolume();
device.togglePower();
device.nextChannel();
console.log(device.getDeviceState());
