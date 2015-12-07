function add(x,y){
    function parseArg(n){
        if (Array.isArray(n)) return add.apply(this, n);
        if (typeof n === 'function') return parseArg(n());
        return isNaN(n) ? 0 : parseInt(n,10);
    }
    var result = 0;
    for(var i=0; i<arguments.length; i++)
        result += parseArg(arguments[i]);
    return result;
}

/*
Function invocation
* As a method of an obj
    - this -> obj
* As a function
    - this -> global (window in the browser)

*/
