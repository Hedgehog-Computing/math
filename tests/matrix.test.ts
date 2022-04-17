import { Matrix } from "../experimental/matrix";

test('1d matrix constructor', () => {
    expect(() => {new Matrix([3, ], 'float')}).toThrowError('shape must be 2D');
 
});

test('2d matrix constructor', () => {
    new Matrix([2, 3], 'float');
    Matrix.ones([3, 3], 'float');
});

test('transpose', () => {
    let matrix = new Matrix([2, 3], 'float');
    let matT = matrix.transpose();
    expect(matT.shape).toEqual([3, 2]);
    let matT2 = matrix.T;
    expect(matT2.shape).toEqual([3, 2]);
});

