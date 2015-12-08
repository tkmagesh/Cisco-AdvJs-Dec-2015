define(['jquery','Handlebars','Task','text!taskListTemplate.html'], function($, Handlebars, Task, taskListTemplate){
    function TaskView(){
        this.init = function(){
            var templateFn = Handlebars.compile(taskListTemplate);
            var data = {
                list : []
            };
            $("#btnAddTask").click(function(){
               var task = new Task($("#txtTask").val(), $("#chkCompleted").prop("checked"))
               data.list.push(task);
               render();
            });
            function render(){
                var taskHtml = templateFn(data);
                $("#list").html(taskHtml);
            }
            $("#btnRemoveCompleted").click(function(){
                for(var i=data.list.length-1; i>=0; i--)
                    if (data.list[i].isCompleted)
                        data.list.splice(i,1);
                render();
            })
            function onTaskItemClick(){
                $(this).toggleClass("completed");
            }

        };
    }
    return TaskView;
});
