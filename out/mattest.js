"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tensor {
    constructor(shape, dtype = 'float') {
        this.data = [];
        if (typeof shape === 'number')
            this.shape = new Int16Array[shape];
        else if (shape !== undefined)
            this.shape = new Int16Array(shape);
        else
            throw new Error('shape is undefined');
        this.dtype = dtype;
        this.size = this.shape.reduce((a, b) => a * b, 1);
    }
    fill(value) {
        this.data = Array(this.size).fill(value);
    }
    static zeros(shape, dtype = 'float') {
        let tensor = new Tensor(shape, dtype);
        tensor.fill(0);
        return tensor;
    }
}
let zeroTensor = Tensor.zeros([2, 3]);
console.log(zeroTensor.shape);
console.log(zeroTensor);
//# sourceMappingURL=mattest.js.map