
export interface Tensor {

    fill(value: number): void;
    zeros(shape: number[], dtype: string): Tensor;
    ones(shape: number[], dtype: string): Tensor;


}

export class Tensor {

    data: Array<any>;
    shape: Array<number>;
    dtype: string;
    size: number;

    constructor(shape: number[] | number, _dtype: string = 'float', ) {

        this.data = [];
        if (typeof shape === 'number') this.shape = Array.from([shape]);
        else if (shape !== undefined) this.shape = Array.from(shape);
        else throw new Error('shape is undefined');

        this.dtype = _dtype;
        this.size = this.shape.reduce((a, b) => a * b, 1);

    }

    get strides() {
        let strides = Array(this.shape.length);
        let shape = this.shape;
        for (let i = shape.length - 1; i > -1; i--) {
            if (i === shape.length - 1) strides[i] = 1;
            else strides[i] = shape.slice(i+1).reduce((a, b) => a * b, 1);
        }
        return strides;
    }

    fill(value: any) {
        this.data = Array(this.size).fill(value);
    }

    static zeros(shape: number[] | number, dtype: string = 'float'): Tensor {
        let tensor = new Tensor(shape, dtype);
        tensor.fill(0);
        return tensor
    }

    static ones(shape: number[] | number, dtype: string = 'float'): Tensor {
        let tensor = new Tensor(shape, dtype);
        tensor.fill(1);
        return tensor
    }

    static arange(length: number, dtype: string = 'float'): Tensor {
        let tensor = new Tensor(length, dtype);
        for (let i = 0; i < length; i++) {
            tensor.data.push(i);
        }
        return tensor;
    }

    at(...index: number[]) {

        for (let i = 0; i < index.length; i++) {
            if (index[i] < 0) index[i] = this.shape[i] + index[i];
            else if (index[i] >= this.shape[i]) throw new Error('index out of range');
        }

        let offset = 0;

        for (let i = 0; i < index.length; i++) {
            offset += index[i] * this.strides[i];
        }

        return this.data[offset];
    }

    reshape(shape: number[]): Tensor {

        let newShape = shape;
        let oldShape = this.shape;
        let newSize = newShape.reduce((a, b) => a * b, 1);
        let oldSize = oldShape.reduce((a, b) => a * b, 1);
        if (newSize !== oldSize) throw new Error('shape is not compatible');

        let newTensor = new Tensor(shape, this.dtype);
        newTensor.data = this.data;

        return newTensor;
    }

    addScalar(val: number): Tensor {
        let newTensor = Tensor.zeros(this.shape, this.dtype);
        for (let i = 0; i < this.size; i++) {
            newTensor.data[i] = this.data[i] + val;
        }
        return newTensor;
    }

    addTensor(rightOperand: Tensor): Tensor {
        // TODO: broadcast
        let newTensor = Tensor.zeros(this.shape, this.dtype);
        for (let i = 0; i < this.size; i++) {
            newTensor.data[i] = this.data[i] + rightOperand.data[i];
        }
        return newTensor
    }

    [Symbol.for('+')](rightOperand: Tensor | number): Tensor {
        if (typeof rightOperand === 'number') {
            return this.addScalar(rightOperand);
        }
        else if (rightOperand instanceof Tensor) {
            return this.addTensor(rightOperand);
        }
    }

}

