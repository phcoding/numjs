var matlab = require('./matlab');
var util = require('../ising2/util');

function dct(mat, n){
    var n = n || mat.length();
    var N = Math.pow(2,matlab.nextpow(n));
    var mat = new matlab.matrix(mat.array.concat(matlab.nums(0,[1,N-mat.length()]).array),[1, N]);
    
    return mat.array;
}

function complex(real, imag){
    this.real = 0;
    this.imag = 0;
    if(util.istype(real,'object')){
        this.real = real[0];
        this.imag = real[1];
    }else if(util.istype(real,'number')){
        this.real = real;
        if(util.istype(imag, 'number')){
            this.imag = imag;
        }else{
            this.imag = 0;
        }
    }
    return this;
}

function square(cnum){
    return new complex(Math.pow(cnum.real,2)-Math.pow(cnum.imag,2),2*cnum.real*cnum.imag);
}

console.log(square(new complex([1,1])))