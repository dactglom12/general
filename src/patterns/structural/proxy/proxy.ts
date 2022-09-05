interface Service {
  request: () => void;
}

class RealService implements Service {
  request() {
    console.log("Real request");
  }
}

class ProxyService implements Service {
  private service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  request() {
    if (this.checkAccess()) {
      this.extraLog();
      this.service.request();
    }
  }

  extraLog() {
    console.log("Logging");
  }

  checkAccess() {
    return true;
  }
}

// Client may work with both: real and proxy, for they implement the same interface

const client = (service: Service) => {
  service.request();
  return '';
};

const proxyService = new ProxyService(new RealService());
const realService = new RealService();

console.log(client(realService));
console.log(client(proxyService));
