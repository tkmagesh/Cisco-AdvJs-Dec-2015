var products = [
    {id : 4, name : "Pen", cost : 50, units : 60, category : 1},
    {id : 8, name : "Hen", cost : 80, units : 80, category : 2},
    {id : 9, name : "Ten", cost : 90, units : 30, category : 1},
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
        //sort();
        console.table(products);
    });

    print("Sort Products By cost", function(){
        //sort
        console.table(products);
    });

    print("Sort Products By units", function(){
        //sort
        console.table(products);
    });
});
