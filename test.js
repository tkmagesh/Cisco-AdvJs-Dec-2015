var Employee = (function(){
    function getId(){
       return this.__id;
    }
    return function Employee(id){
       this.__id = id;
       this.getId = getId;
    }
})();
