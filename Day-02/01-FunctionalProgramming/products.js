var products = [
    {id : 4, name : "Pen", cost : 50, units : 60, category : 1},
    {id : 8, name : "Hen", cost : 80, units : 80, category : 2},
    {id : 9, name : "Ten", cost : 40, units : 30, category : 1},
    {id : 5, name : "Den", cost : 60, units : 50, category : 2},
    {id : 2, name : "Zen", cost : 70, units : 10, category : 1}
];

/*
sort
filter
all
any
countBy
min
max
sum
aggregate
groupBy
*/
function print(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

print("Default List", function(){
    console.table(products);
});

print("Sort", function(){

    print("Default sort [products by id]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++)
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }

        }
        sort();
        console.table(products);
    });
    print("Generic Sort - by attribute", function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        print("Sort Products By cost", function(){
            //sort
            sort(products, "cost");
            console.table(products);
        });

        print("Sort Products By units", function(){
            //sort
            sort(products, "units");
            console.table(products);
        });
    });
    print("Generic Sort - using comparer", function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (comparerFn(list[i], list[j]) > 0){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        print("Sort products by value [cost * units]", function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            }
            sort(products, productComparerByValue);
            console.table(products);
        });
    })
});

print("Filter", function(){
    function filter(list, criteriaFn){
        var result = [];
        for(var i=0; i<list.length; i++)
            if (criteriaFn(list[i]))
                result.push(list[i]);
        return result;
    }
    function negate(criteriaFn){
        return function(){
            return !criteriaFn.apply(this, arguments);
        }
    }

    var costlyProductCriteria = function(product){
        return product.cost > 50;
    };
    /*var affordableProductCriteria = function(product){
        return !costlyProductCriteria(product);
    };*/
    var affordableProductCriteria = negate(costlyProductCriteria);

    print("Costly products [ cost > 50 ]", function(){

        var costlyProducts = filter(products, costlyProductCriteria);
        console.table(costlyProducts);
    });
    print("affordable products [ !costly products]", function(){
        var affordableProducts = filter(products, affordableProductCriteria);
        console.table(affordableProducts);
    });

    var category1Criteria = function(product){
        return product.category === 1;
    };
    /*var nonCategory1Criteria = function(product){
        return !category1Criteria(product);
    }*/
    var nonCategory1Criteria = negate(category1Criteria);

    print("category-1 products [ category = 1 ]", function(){
        var category1Products = filter(products, category1Criteria);
        console.table(category1Products);
    });
    print("non category-1 products [ !category1Product]", function(){
        var nonCategory1Products = filter(products, nonCategory1Criteria);
        console.table(nonCategory1Products);
    });
});

print("Min", function(){
    function min(list, valueSelector){
        var result = valueSelector(list[0]);
        for(var i=1; i<list.length; i++){
            var value = valueSelector(list[i]);
            if (value < result) result = value;
        }
        return result;
    }
    var minCost = min(products, function(product){ return product.cost });
    console.log("Minimum cost = ", minCost);

    var minUnits = min(products, function(product){ return product.units });
    console.log("Minimum units = ", minUnits);

});

print("Max", function(){
    function max(list, valueSelector){
        var result = valueSelector(list[0]);
        for(var i=1; i<list.length; i++){
            var value = valueSelector(list[i]);
            if (value > result) result = value;
        }
        return result;
    }
    var maxCost = max(products, function(product){ return product.cost });
    console.log("maximum cost = ", maxCost);

    var maxUnits = max(products, function(product){ return product.units });
    console.log("maximum units = ", maxUnits);

});

print("Sum", function(){
    function sum(list, valueSelector){
        var result = 0
        for(var i=0; i<list.length; i++){
            result += valueSelector(list[i]);
        }
        return result;
    }
    var sumCost = sum(products, function(product){ return product.cost });
    console.log("sum cost = ", sumCost);

    var sumUnits = sum(products, function(product){ return product.units });
    console.log("sum units = ", sumUnits);

});

print("Aggregate", function(){
    function aggregate(list, aggregator, start){
        var result = start;
        for(var i=0; i<list.length; i++){
            result = aggregator(result, list[i]);
        }
        return result;
    }
    var minCost = aggregate(products, function(result, product){
        return result < product.cost ? result : product.cost
    }, Number.MAX_VALUE);
    console.log("minCost = ", minCost);

    var maxUnits = aggregate(products, function(result, product){
        return result > product.units ? result : product.units;
    }, Number.MIN_VALUE);
    console.log("maxUnits = ", maxUnits);

    var sumUnits = aggregate(products, function(result, product){
        return result + product.units;
    },0);
    console.log("SumUnits = ", sumUnits);
});

print("GroupBy", function(){
    function groupBy(list, keySelector){
        var result = {};
        for(var i=0; i<list.length; i++){
            var key = keySelector(list[i]);
            if (typeof result[key] === 'undefined')
                result[key] = [];
            result[key].push(list[i]);
        }
        return result;
    }
    function printGroup(title, groupedList){
        print(title, function(){
            for(var key in groupedList)
                print("Key - " + key, function(){
                    console.table(groupedList[key]);
                });
        });
    }
    var productsByCategory = groupBy(products, function(p){return p.category});
    printGroup("Products By Category", productsByCategory);

    var productsByCost = groupBy(products, function(p){
        return p.cost > 50 ? "costly" : "affordable";
    });
    printGroup("Products By Affordability", productsByCost);

});
