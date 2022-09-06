export interface Shape {
  calculateArea(): number;
}

export type WithId = { id: string };

export type ShapeWithId = Shape & WithId;

export type ShapeDescription = {
  type: ShapeTypes;
  parameters: number[];
};

export enum ShapeTypes {
  TRIANGLE = 'triangle',
  RECTANGLE = 'rectangle',
  SQUARE = 'square',
}

export abstract class AbstractShapeFactory {
  private shapes: Shape[] = [];

  abstract createShape(...args: number[]): Shape;
  // there might be another useful functions

  calculateOverallArea() {
    return this.shapes.reduce(
      (overall, curr) => overall + curr.calculateArea(),
      0,
    );
  }

  pushNewShape(...args: number[]) {
    const shape = this.createShape(...args);
    this.shapes.push(shape);
  }
}
