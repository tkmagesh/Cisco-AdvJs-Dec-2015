function getPrimeFinder(){
    function isPrime(n){
        console.log('processing ', n);
        if (n <= 3) return true;
        for(var i=2; i<= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }
    var cache = {};
    return function(n){
        if (typeof cache[n] === 'undefined')
            cache[n] = isPrime(n);
        return cache[n];
    }
}

function getEvenOddFinder(){
    function evenOrOdd(n){
        console.log('processing ', n);
        return n % 2 === 0 ? 'even' : 'odd'
    }
    var cache = {};
    return function(n){
        if (typeof cache[n] === 'undefined')
            cache[n] = evenOrOdd(n);
        return cache[n];
    }
}

function memoize(fn){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (!cache.hasOwnProperty(key))
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}

var getSqrt = memoize(function(n){
  console.log('processing ', n);
  return Math.sqrt(n);
});

var multiply = memoize(function(x,y){
    console.log('processing ', x , ' and ', y);
    return x * y;
})

var add = memoize(function(x,y,z){
    console.log('processing ', x , ' and ', y, ' and ', z);
    return x + y + z;
})
