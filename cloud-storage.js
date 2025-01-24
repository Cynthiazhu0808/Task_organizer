// Author: Cynthia Zhu
// Date: 12/15/2024
// Description: stores the info into cloud and load

'use strict';

/** 
* save all the info to cloud
*
*/
function saveToCloud() {
    let convertedTagColors = JSON.stringify(tagColors);
    setItem('tagColors', convertedTagColors, checkError);

    let convertedTasks = JSON.stringify(theTaskList.getDescription());
    setItem('tasks', convertedTasks, checkError);
}

/** 
* load all the info from cloud
*
*/
function loadFromCloud() {
    getItem("tagColors", function(resp) {
        if (resp.error) {
            alert("Error loading tag colors: " + resp.error);
            return;
        }
        
        tagColors = JSON.parse(resp.value);
        updateTags();
    });

    getItem("tasks", function(taskResp) {
        if (taskResp.error) {
            alert("Error loading tasks: " + taskResp.error);
            return;
        }
            
        let taskData = JSON.parse(taskResp.value);
                
        if (taskData !== null) {
            $(theTaskList.domElt).empty();
            theTaskList.counter = taskData.counter;
            theTaskList.key = taskData.key;
            theTaskList.taskList = [];
                    
            taskData.list.forEach(taskDesc => {
                theTaskList.addSavedTask(taskDesc);
            });
        }
    });
}


$("#loginCloudButton").one().on("click",function(){
    let user=window.prompt("what username?");
    if (user){login(user);};
}
)
$('#loadCloudButton').one().on('click', loadFromCloud);
$('#saveCloudButton').one().on('click', saveToCloud);
