abstract class Algorithm {
  public doBusinessLogic() {
    this.hook1();
    this.operation1();
    this.operation2();
    this.operation3();
    this.operation4();
  }

  protected operation1() {
    console.log('OPERATION 1: THIS IS SPECIFIC OPERATION');
  }

  protected operation2() {
    console.log('OPERATION 2: THIS IS SPECIFIC OPERATION');
  }

  protected hook1() {
    console.log('HOOK 1: THIS IS FIRST HOOK');
  }

  protected abstract operation3();
  protected abstract operation4();
}

class SpecificAlgorithm1 extends Algorithm {
  protected operation3() {
    console.log(
      'OPERATION 3: THIS IS ABSTRACT OPERATION, AND SPECIFIC ALGORITHM 1 CREATED IT',
    );
  }

  protected operation4() {
    console.log(
      'OPERATION 4: THIS IS ABSTRACT OPERATION, AND SPECIFIC ALGORITHM 1 CREATED IT',
    );
  }

  protected hook1() {
    console.log('HOOK 1: THIS IS HOOK, AND SPECIFIC ALGORITHM 1 CREATED IT');
  }
}
class SpecificAlgorithm2 extends Algorithm {
  protected operation3() {
    console.log(
      'OPERATION 3: THIS IS ABSTRACT OPERATION, AND SPECIFIC ALGORITHM 2 CREATED IT',
    );
  }

  protected operation4() {
    console.log(
      'OPERATION 4: THIS IS ABSTRACT OPERATION, AND SPECIFIC ALGORITHM 2 CREATED IT',
    );
  }
}

console.log(new SpecificAlgorithm1().doBusinessLogic());
console.log(new SpecificAlgorithm2().doBusinessLogic());
