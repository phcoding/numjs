/**
 * [nums description]
 * @param  {[type]} num   [description]
 * @param  {[type]} shape [description]
 * @return {[type]}       [description]
 */
exports.nums = function(num, shape){
    var shape = (typeof(shape)=='number')?[shape,shape]:shape||[1,1];
    var array = new Array(shape[0]*shape[1]);
    if(typeof(num)=='function'){
        for (var i = 0; i < shape[0]; i++) {
            for (var j = 0; j < shape[1]; j++) {
                array[i*shape[1]+j] = num();
            }
        }
    }else{
        for (var i = 0; i < shape[0]; i++) {
            for (var j = 0; j < shape[1]; j++) {
                array[i*shape[1]+j] = num;
            }
        }
    }
    return new exports.matrix(array, shape);
};

/**
 * [number description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
exports.number = function(num){
    return new exports.matrix([num]);
};

/**
 * [linspace description]
 * @param  {[type]} str  [description]
 * @param  {[type]} end  [description]
 * @param  {[type]} step [description]
 * @return {[type]}      [description]
 */
exports.linspace = function(str, end, step){
    var step = step;
    var array = [];
    if(step>0){
        array = new Array(step);
        array[step-1] = end;
    }
    for (var i = step-2; i > -1; i--) {
        array[i] = str + i*(end-str)/(step-1);
    }
    return new exports.matrix(array);
};

/**
 * [istype description]
 * @param  {[type]} obj   [description]
 * @param  {[type]} cname [description]
 * @return {[type]}       [description]
 */
exports.istype = function(obj, cname){
    return typeof(obj)===cname;
};

/**
 * [random description]
 * @param  {[type]} shape [description]
 * @return {[type]}       [description]
 */
exports.random = function(shape){
    var shape = shape || [1, 1];
    if (exports.istype(shape,'number')) {
        shape = [shape, shape];
    }
    var array = new Array(shape[0]*shape[1]);
    for (var i = 0; i < array.length; i++) {
        array[i] = Math.random();
    }
    return new exports.matrix(array, shape);
};

exports.nextpow = function(n, pow){
    var pow = pow || 2;
    return Math.ceil(Math.log(n)/Math.log(pow));
};

/**
 * [matrix description]
 * @param  {[type]} array [description]
 * @param  {[type]} shape [description]
 * @return {[type]}       [description]
 */
exports.matrix = function(array, shape){ 
    this.array = array||[];
    this.shape = shape||[1,array.length];

    /**
     * [length description]
     * @return {[type]} [description]
     */
    this.length = function(){
        return this.shape[0]*this.shape[1];
    };

    /**
     * [islike description]
     * @param  {[type]} mat [description]
     * @return {[type]}     [description]
     */
    this.islike = function(mat){
        return (this.shape[0]==mat.shape[0] && this.shape[1]==mat.shape[1]);
    }

    /**
     * [transpose description]
     * @return {[type]} [description]
     */
    this.transpose = function(){
        var array = new Array(this.length());
        var shape = [this.shape[1],this.shape[0]];
        for (var i = 0; i < shape[0]; i++) {
            for (var j = 0; j < shape[1]; j++) {
                array[i*shape[1]+j] = this.array[j*shape[0]+i];
            }
        }
        return new exports.matrix(array, shape);
    };

    /**
     * [plus description]
     * @param  {[type]} mat [description]
     * @return {[type]}     [description]
     */
    this.plus = function(mat){
        var array = new Array(this.length());
        if(exports.istype(mat, 'number')){
            mat = exports.number(mat);
        }
        if(this.islike(mat)){
            for (var i = 0; i < this.length(); i++) {
                array[i] = this.array[i]+mat.array[i];
            }
            return new exports.matrix(array, this.shape);
        }else if(mat.length()==1){
            for (var i = 0; i < this.length(); i++) {
                array[i] = this.array[i]+mat.array[0];
            }
            return new exports.matrix(array, this.shape);
        }else{
            console.log("shape of mat isn't fit with this !");
        }
    };

    /**
     * [dot description]
     * @param  {[type]} mat [description]
     * @return {[type]}     [description]
     */
    this.dot = function(mat){
        var array = new Array(this.length());
        if(exports.istype(mat, 'number')){
            mat = exports.number(mat);
        }
        if(this.islike(mat)){
            for (var i = 0; i < this.length(); i++) {
                array[i] = this.array[i]*mat.array[i];
            }
            return new exports.matrix(array, this.shape);
        }else if(mat.length()==1){
            for (var i = 0; i < this.length(); i++) {
                array[i] = this.array[i]*mat.array[0];
            }
            return new exports.matrix(array, this.shape);
        }else{
            return console.error("shape of mat isn't fit with this !");
        }
    };

    /**
     * [cross description]
     * @param  {[type]} mat [description]
     * @return {[type]}     [description]
     */
    this.cross = function(mat){
        if (this.shape[1]==mat.shape[0]) {
            var mat = mat.transpose();
            var shape = [this.shape[0], mat.shape[1]];
            var array = new Array(shape[0]*shape[1]);
            for (var i = 0; i < shape[0]; i++) {
                for (var j = 0; j < shape[1]; j++) {
                    array[i*shape[1]+j] = this.slice(i).dot(mat.slice(j)).sum2();
                }
            }
            return new exports.matrix(array, shape);
        }else{
            return console.error("row of mat isn't equal to col of this !");
        }
    };

    /**
     * [slice description]
     * @param  {[type]} rows [description]
     * @param  {[type]} cols [description]
     * @return {[type]}      [description]
     */
    this.slice = function(rows, cols){
        var rows = (typeof(rows)=='number')?[rows, rows]:rows||[0,-1];
        var cols = (typeof(cols)=='number')?[cols, cols]:cols||[0,-1];
        rows[0] = rows[0]<0?rows[0]+this.shape[0]:rows[0];
        rows[1] = rows[1]<0?rows[1]+this.shape[0]:rows[1];
        cols[0] = cols[0]<0?cols[0]+this.shape[1]:cols[0];
        cols[1] = cols[1]<0?cols[1]+this.shape[1]:cols[1];
        var shape = [(rows[1]-rows[0]+1),(cols[1]-cols[0]+1)];
        var array = new Array(shape[0]*shape[1]);
        for (var i = rows[0]; i <= rows[1]; i++) {
            for (var j = cols[0]; j <= cols[1]; j++) {
                array[(i-rows[0])*shape[1]+(j-cols[0])] = this.array[i*this.shape[1]+j];
            }
        }
        return new exports.matrix(array, shape);
    };

    /**
     * [trans description]
     * @param  {[type]} func [description]
     * @return {[type]}      [description]
     */
    this.trans = function(func){
        var array = [];
        for (var i = 0; i < this.length(); i++) {
            array[i] = func(this.array[i]);
        }
        return new exports.matrix(array, this.shape);
    };

    /**
     * [pow description]
     * @param  {[type]} pow [description]
     * @return {[type]}     [description]
     */
    this.pow = function(pow){
        var pow = pow||2;
        var array = [];
        for (var i = 0; i < this.length(); i++) {
            array[i] = Math.pow(this.array[i], pow);
        }
        return new exports.matrix(array, this.shape);
    };

    /**
     * [exp description]
     * @param  {[type]} base [description]
     * @return {[type]}      [description]
     */
    this.exp = function(base){
        var base = base||Math.e;
        var array = [];
        for (var i = 0; i < this.length(); i++) {
            array[i] = Math.pow(base, this.array[i]);
        }
        return new exports.matrix(array, this.shape);
    };

    /**
     * [sum description]
     * @param  {[type]} dim [description]
     * @return {[type]}     [description]
     */
    this.sum = function(dim){
        var dim = dim || 0;
        if(dim==0){
            var array = new Array(this.shape[1]);
            for (var i = 0; i < array.length; i++) {
                array[i] = 0;
                for (var j = 0; j < this.shape[0]; j++) {
                    array[i] += this.array[i*this.shape[0]+j];
                }
            }
            return new exports.matrix(array);
        }else{
            return this.transpose().sum().transpose();
        }
    }

    /**
     * [sum2 description]
     * @return {[type]} [description]
     */
    this.sum2 = function(){
        return this.sum(0).sum(1).array[0] || 0;
    };

    /**
     * [print description]
     * @return {[type]} [description]
     */
    this.print = function(){
        var array = new Array(this.shape[0]);
        for (var i = 0; i < this.shape[0]; i++) {
            array[i] = new Array(this.shape[1]);
            for (var j = 0; j < this.shape[1]; j++) {
                array[i][j] = this.array[i*this.shape[1]+j];
            }
        }
        console.log(array);
    };

    return this;
};