
export interface dtype {

}

export class dtype {

    dtype: string;
    
    constructor(_dtype: string | dtype) {
        if (typeof _dtype === 'string') this.dtype = _dtype;
        else if (_dtype instanceof dtype) this.dtype = _dtype.dtype;
        else throw new Error('dtype is undefined');
    }

    get itemsize() {
        return 1;
    }

}