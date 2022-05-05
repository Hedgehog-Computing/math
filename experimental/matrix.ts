import { Tensor } from "./tensor";

export class Matrix extends Tensor {

    constructor(shape: number[], _dtype: string = 'float', ) {

        if (shape.length !== 2) throw new Error('shape must be 2D');
        super(shape, _dtype);
    }

    static zeros(shape: number[], dtype: string = 'float'): Matrix {
        let tensor = new Matrix(shape, dtype);
        tensor.fill(0);
        return tensor
    }

    static ones(shape: number[], dtype: string = 'float'): Matrix {
        let tensor = new Matrix(shape, dtype);
        tensor.fill(1);
        return tensor
    }

    static arange(length: number, dtype: string = 'float'): Matrix {
        throw new Error('matrix not support arange method');
    }

    transpose(): Matrix {
        let matT = new Matrix([...this.shape].reverse(), this.dtype);
        for (let i = 0; i < this.size; i++) {
            matT.data[i] = this.data[i];
        }
        return matT;
    }

    get T(): Matrix {
        return this.transpose();
    }

}