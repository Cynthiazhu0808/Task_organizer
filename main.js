// Author: Cynthia Zhu
// Date: 12/15/2024
// Description: builds the TaskList class

'use strict';

/** 
* gather the inputs from the form into a single description dictionary and add it to theTaskList as a task
*
*/
function addTaskFromForm(){
    const taskDescription = {
        "text": $('#taskText').val(),
        "priority": $('[name=taskPriority]').val(),
        "duedate": $('#taskDueDate').val(),
        "tag": $('[name=tag]:checked').val()   //see which tag is checked
    };
    theTaskList.addNewTask(taskDescription);
}

$("#addTaskButton").one().on("click",function(){
    addTaskFromForm();
    $("#addTaskDropDown").one().removeClass('show'); //hide the dropdown menu
    $('#addTask')[0].reset();
}
);

$('#cancelAddTask').one().on('click', function() {
    $('#addTaskDropDown').one().removeClass('show');
    $('#addTaskDropDown')[0].reset();
});

$('#theTasks').on('click', '.markDone', function(event) {
    const taskElement = $(event.target).closest('li.task');
    const taskId = parseInt(taskElement.attr('data-taskId'), 10);
    theTaskList.getTask(taskId).toggleDone();
});

$('#theTasks').on('click', '.delete', function(event) {
    const taskElement = $(event.target).closest('li.task');
    const taskId = parseInt(taskElement.attr('data-taskId'), 10);
    theTaskList.deleteTask(taskId);
});

$("#saveLocalButton").one().on("click",function(){theTaskList.save();});
$("#loadLocalButton").one().on("click",function(){theTaskList.load()});

$("#sortIdButton").one().on("click",function(){theTaskList.sortById();});
$("#sortTagButton").one().on("click",function(){theTaskList.sortByTag();});
$("#sortDueDateButton").one().on("click",function(){theTaskList.sortByDueDate();});
$("#sortPriorityButton").one().on("click",function(){theTaskList.sortByPriority();});
