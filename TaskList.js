// Author: Cynthia Zhu
// Date: 12/15/2024
// Description: builds the TaskList class

'use strict';

class TaskList{
    taskList;
    key;
    domElt;
    counter;

    /** 
    * Constructor
    *
    * @param {string} key - a string of the key
    * @param {string} domElt - a string of the dom element to be added to
    */
    constructor(key,domElt){
        this.taskList=[];
        this.key=key;
        this.domElt=domElt;
        this.counter=100;
    }

    /** 
    * creates a new Task object given the description
    *
    * @param {dictionary} description - the description (a dictionary)
    * @return {task} a new task object
    */
    addNewTask(description){
        this.counter+=1;
        let t1=new Task(description);
        t1.setId(this.counter);
        this.taskList.push(t1);
        t1.addToDom(this.domElt);
        return t1;
    }

    /** 
    * re-creates a Task object (from a dictionary saved to localStorage)
    *
    * @param {dictionary} description - the description (a dictionary)
    * @return {task} the recreated task object
    */
    addSavedTask(description){
        let t1=new Task(description);
        t1.setId(description['id']);
        this.taskList.push(t1);
        t1.addToDom(this.domElt);
        if (description['done']){
            t1.toggleDone();
        }
        return t1;
    }

    /** 
    * returns the Task object with the given id.
    *
    * @param {number} tid - the id
    * @return {task} the Task object with the given id
    */
    getTask(tid){
        return this.taskList.find(task => task.getId() === tid);
    }

    /** 
    * deletes the Task object with the given id
    *
    * @param {number} tid - the id
    * @return {number} -1 if the task doesn't exist in the list
    */
    deleteTask(tid){
        let index=this.taskList.findIndex(task => task.getId() === tid);
        if (index === -1){
            return -1;
        }
        this.taskList[index].delete();
        this.taskList.splice(index,1);
    }

    /** 
    * returns a dictionary of the tasklist info
    *
    * @return a dictionary of the tasklist info
    */
    getDescription() {
        return {
            "counter": this.counter,  // Keeps track of the total number of tasks or next task ID
            "key": this.key,          // Potentially a unique identifier for the task list
            "list": this.taskList.map(task => 
                task.getDescriptionObject()
            )
        };
    }

    /** 
    * saves the current list to localStorage and the other necessary information
    *
    */
    save(){
        localStorage.setItem(this.key,JSON.stringify(this.getDescription()));
    }

    /** 
    * clears the DOM element and re-displays all the tasks
    *
    */
    refresh() {
        $(this.domElt).empty();
        this.taskList.map((element) => {
            $(this.domElt).append(element.getDomElt());
        });
    }
    
    /** 
    * loads a list of task descriptions from local storage and adds them to the tasklist
    *
    */
    load(){
        let dict=JSON.parse(localStorage.getItem(this.key));
        $(this.domElt).empty();
        if (dict!==null){
            this.taskList = [];
            dict["list"].map(taskData => {
                this.addSavedTask(taskData);
            });
            this.counter=dict["counter"];
        }
    }

    /** 
    * sorts the list by task id and updates the page
    *
    */
    sortById(){
        this.taskList.sort(function(a,b){return a.getId()-b.getId();});
        this.refresh();
    }

    /** 
    * sorts the list by tag and updates the page
    *
    */
    sortByTag(){
        this.taskList.sort((a, b) => a.getTag().localeCompare(b.getTag()));
        this.refresh();
    }

    /** 
    * sorts the list by due date and updates the page
    *
    */
    sortByDueDate(){
        this.taskList.sort(function(a,b){return a.getDueDate()-b.getDueDate();});
        this.refresh();
    }

    /** 
    * sorts the list by priority and updates the page
    *
    */
    sortByPriority(){
        this.taskList.sort(function(a,b){
            let AP=a.getPriority();
            let BP=b.getPriority();
            let dict={"high":1,"medium":2,"low":3,null:4};
            return dict[AP]-dict[BP];});
        this.refresh();
    }

    /** 
    * prints all the tasks in order, converting each to a string
    *
    */
    print(){
        this.taskList.forEach((element)=>console.log(element.toString()));
    }
    
}
var theTaskList=new TaskList("Cynthia","#theTasks");
