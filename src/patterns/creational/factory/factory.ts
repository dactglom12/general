import { Shape, AbstractShapeFactory } from "./interfaces";

// Shape - general interface which must be followed by all subclasses
// TriangleFactory, RectangleFactory, SquareFactory -> classic implementation of the pattern (as far as I understand)
// Shaper -> more useful implementation that comprises lots of different FACTORY METHODS which return objects that follow one particular interface

class Triangle implements Shape {
  private a: number;
  private b: number;
  private c: number;

  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  calculateArea(): number {
    return this.a * this.b * this.c;
  }

  calculatePerimeter() {
    return this.a + this.b + this.c;
  }
}

class Square implements Shape {
  private side: number;

  constructor(side) {
    this.side = side;
  }

  calculateArea(): number {
    return this.side ** 2;
  }
}

class Rectangle implements Shape {
  private a: number;
  private b: number;

  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  calculateArea(): number {
    return this.a * this.b;
  }
}

class TriangleFactory extends AbstractShapeFactory {
  createShape(a, b, c): Shape {
    return new Triangle(a, b, c);
  }
}

class RectangleFactory extends AbstractShapeFactory {
  createShape(a, b): Shape {
    return new Rectangle(a, b);
  }
}

class SquareFactory extends AbstractShapeFactory {
  createShape(side): Shape {
    const square = new Square(side);
    return square;
  }
}

const n = new SquareFactory();
n.pushNewShape(5);
n.pushNewShape(5);
n.pushNewShape(5);

console.log(n.calculateOverallArea());

export class Shaper {
  shape: Shape;

  private constructor(shape: Shape) {
    this.shape = shape;
  }

  private static createShape(shape: Shape) {
    return new Shaper(shape);
  }

  public calculateArea() {
    return this.shape.calculateArea();
  }

  static createRectangle(a, b) {
    const shape = new Rectangle(a, b);
    return Shaper.createShape(shape);
  }

  static createTriangle(a, b, c) {
    const shape = new Triangle(a, b, c);
    return Shaper.createShape(shape);
  }

  static createSquare(side) {
    const shape = new Square(side);
    return Shaper.createShape(shape);
  }
}
