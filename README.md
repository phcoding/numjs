# numjs
```javascript
//load lib.
const numjs = require('./numjs');
//create matrix a from array.
var a = new numjs.matrix(numjs.linspace(1,9,9).array, [3,3]);
//print matrix a.
a.print();
```
> `>>> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]`

```javascript
//create random matrix.
var b = numjs.random(3);
//print matrix b;
b.print();
```
> `>>>`
> `[ [ 0.8179369200338522, 0.061001336902696046, 0.2144879006316711 ],`
> `  [ 0.5705785105308054, 0.7570802468887163, 0.4912138810045723 ],`
> `  [ 0.7742470425300807, 0.3581051938550892, 0.0561141415278148 ] ]`

```javascript
//print result of a dot b.
a.dot(b).print();
```
> `>>>`
> `[ [ 0.8179369200338522, 0.12200267380539209, 0.6434637018950133 ],`
> `[ 2.2823140421232218, 3.7854012344435817, 2.947283286027434 ],`
> `[ 5.419729297710565, 2.8648415508407137, 0.5050272737503332 ] ]`

```javascript
//print result of a cross b.
a.cross(b).print();
```
> `>>>`
> `[ [ 4.281835068685705, 2.649477412245396, 1.3652580872242601 ],`
> `[ 10.770122487969921, 6.1780377451849, 3.650705856716435 ],`
> `[ 17.258409907254137, 9.706598078124406, 5.936153626208609 ] ]`