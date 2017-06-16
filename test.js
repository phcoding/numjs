//load numjs lib.
const numjs = require('./numjs');
//create matrix from array.
var a = new numjs.matrix(numjs.linspace(1,9,9).array, [3,3]);
//create matrix from random.
var b = numjs.random(3);
//create matrix from nums.
//numjs.nums(Math.random, 3) is equal to numjs.random(3).
var c = numjs.nums(Math.random, 3);
//transform matrix according to given transform function.
var d = c.trans(function(i){return i>0.5?1:-1;});
//transpose matrix
var e = a.transpose();
//print matrix a and b;
a.print();
b.print();
//print result of a dot b.
a.dot(b).print();
//print result of a cross b.
a.cross(b).print();
