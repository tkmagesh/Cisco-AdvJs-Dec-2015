require(['jquery','TaskView','text!appTemplate.html'], function($, TaskView, appTemplate){
    $(function(){
        $(document.body).append(appTemplate);
        var view = new TaskView();
        view.init();
    });
})
