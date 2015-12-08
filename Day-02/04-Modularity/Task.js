define([], function(){
    function Task(name , isCompleted){
        this.name = name;
        this.isCompleted = isCompleted;
    }
    Task.prototype.toggleCompletion = function(){
        this.isCompleted = !this.isCompleted
    };
    return Task;
})
