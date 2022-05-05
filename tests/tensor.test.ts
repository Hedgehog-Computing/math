
import { Tensor } from "../experimental/tensor";

test('1d tensor constructor', () => {
    let tensor = new Tensor(3, 'float');
    expect(tensor.data).toEqual([]);
    expect(tensor.shape).toEqual([3, ]);
    expect(tensor.dtype).toEqual('float');
    expect(tensor.size).toEqual(3);
});

test('2d tensor constructor', () => {
    let tensor = new Tensor([2, 3], 'float');
    expect(tensor.data).toEqual([]);
    expect(tensor.shape).toEqual([2, 3]);
    expect(tensor.dtype).toEqual('float');
    expect(tensor.size).toEqual(6);
});

test('1d zeros tensor', () => {
    let tensor = Tensor.zeros(3, 'float');
    expect(tensor.data).toEqual([0, 0, 0]);
    expect(tensor.shape).toEqual([3, ]);
    expect(tensor.dtype).toEqual('float');
    expect(tensor.size).toEqual(3);
});

test('2d zeros tensor', () => {
    let tensor = Tensor.zeros([2, 3], 'float');
    expect(tensor.data).toEqual([0, 0, 0, 0, 0, 0]);
    expect(tensor.shape).toEqual([2, 3]);
    expect(tensor.dtype).toEqual('float');
    expect(tensor.size).toEqual(6);
});

test('arange', () => {
    let tensor = Tensor.arange(5);
    expect(tensor.data).toEqual([0,1,2,3,4]);
});

test('get 1d strides', () => {
    let tensor = Tensor.arange(5);
    expect(tensor.strides).toEqual([1,]);
});

test('get 2d strides', () => {
    let tensor = Tensor.zeros([2, 3]);
    expect(tensor.strides).toEqual([3, 1]);
});

test('get 3d strides', () => {
    let tensor = Tensor.zeros([2, 3, 4]);
    expect(tensor.strides).toEqual([12, 4, 1]);

});

test('get 4d strides', () => {
    let tensor = Tensor.zeros([2, 3, 4, 5]);
    expect(tensor.strides).toEqual([60, 20, 5, 1]);
});

test('reshape 1d to 2d', () => {
    let oldTensor = Tensor.arange(6);
    expect(oldTensor.shape).toEqual([6,]);
    let newTensor = oldTensor.reshape([3, 2]);
    expect(newTensor.shape).toEqual([3, 2]);
});

test('reshape 2d to 3d', () => {
    let oldTensor = Tensor.arange(24).reshape([4, 6]);
    expect(oldTensor.shape).toEqual([4, 6]);
    let newTensor = oldTensor.reshape([2, 3, 4]);
    expect(newTensor.shape).toEqual([2, 3, 4]);
    expect(newTensor.at(0, 0, 0)).toEqual(0);
    expect(newTensor.at(1, 2, 3)).toEqual(23);
})

test('1d at', () => {
    let tensor = Tensor.arange(5);
    expect(tensor.at(0)).toEqual(0);
    expect(tensor.at(1)).toEqual(1);
    expect(tensor.at(-1)).toEqual(4);
});

test('2d at', () => {
    let tensor = Tensor.zeros([2, 3]);
    expect(tensor.at(0, 0)).toEqual(0);
    expect(tensor.at(1, 1)).toEqual(0);
});

test('addScalar', () => {
    let tensor = Tensor.arange(5);
    let result = tensor.addScalar(1);
    expect(result.at(0)).toEqual(1);
    expect(result.at(-1)).toEqual(5);
});

test('add Tensor', () => {
    let tensor1 = Tensor.arange(5);
    let tensor2 = Tensor.arange(5);
    let result = tensor1.addTensor(tensor2);
    expect(result.at(0)).toEqual(0);
    expect(result.at(1)).toEqual(2);
    expect(result.at(-1)).toEqual(8);
});

