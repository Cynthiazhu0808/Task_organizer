// Author: Cynthia Zhu
// Date: 12/15/2024
// Description: builds the task class

'use strict';

class Task{
    id;
    text;
    priority;
    duedate;
    tag;
    done;
    element;

    /** 
    * Constructor
    *
    * @param {dictionary} dict - a dictionary storing the info of the task
    */
    constructor(dict){
        this.id=-1;
        this.text=dict['text'];
        this.priority=dict['priority'];
        this.duedate = new Date(dict['duedate']);
        this.tag=dict['tag'];
        this.done=false;
    }

    /** 
    * return a string representation of the task
    *
    * @return a string representation of the task
    */
    toString(){
        return "Task with id "+this.id+" and content "+this.text+" have priority "+this.priority+" and due date "+this.getFormattedDueDate()+" and tag "+this.tag+" and done?: " +this.done;
    }

    /** 
    * returns a nice string representation of the due date
    *
    * @return a nice string representation of the due date
    */
    getFormattedDueDate(){
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayName = days[this.duedate.getDay()];
        const monthName = months[this.duedate.getMonth()];
        const date = this.duedate.getDate();
        const year = this.duedate.getFullYear();

    return dayName+" "+monthName+" "+date+" "+year;
    }

    /** 
    * creates a DOM element for this task and adds it to the page at the specified location
    *
    * @param {string} destination - a string of the container to add to
    */
    addToDom(destination){
        this.element=$('<li>').addClass('task');
        this.element.append($('<span>').addClass('id').text(this.id+" "));
        this.element.attr("data-taskid",this.id);
        this.element.append($('<span>').addClass('due').text(this.getFormattedDueDate()+" "));
        this.element.append($('<span>').addClass('priority').text(this.priority+" "));
        this.element.append($('<span>').addClass('tag').text(this.tag));
        this.element.append($('<p>').addClass('text').text(this.text));
        this.element.append($('<button>').addClass('markDone').text("✔").attr("type","button"));
        this.element.append($('<button>').addClass('delete').text("✖").attr("type","button"));
        this.element.css("background-color",tagColors[this.tag]);
        $(destination).append(this.element);
    }

    /** 
    * returns the DOM element
    *
    * @return the DOM element
    */
    getDomElt(){
        return this.element;
    }

    /** 
    * returns the due date as a Date object
    *
    * @return the due date as a Date object
    */
    getDueDate(){
        return this.duedate;
    }

    /** 
    * returns the current "done" status of the task element: a boolean
    *
    * @return the current "done" status of the task element: a boolean
    */
    isDone(){
        return this.done;
    }

    /** 
    * returns the unique ID for this task
    *
    * @return the unique ID for this task
    */
    getId(){
        return this.id;
    }

    /** 
    * sets the ID for this task
    *
    * @param {number} id -the ID for this task
    */
    setId(id){
        this.id=id;
        if (this.element){
        this.element.attr("data-taskid",this.id);}
    }

    /** 
    * toggles whether the task is done or no
    *
    */
    toggleDone(){
        if (!this.done){
            this.element.addClass("done");
            this.done=true;
        }
        else{
            this.element.removeClass("done");
            this.done=false;
        }
    }

    /** 
    * deletes the associated DOM element from the page
    *
    */
    delete(){
        this.element.remove();
    }

    /** 
    * returns the tag for this task
    *
    * @return the tag for this task
    */
    getTag(){
        return this.tag;
    }

    /** 
    * returns the priority of this task
    *
    * @return the priority of this task
    */
    getPriority(){
        return this.priority;
    }

    /** 
    * returns a dictionary with information of this task object
    *
    * @return a dictionary with information of this task object
    */
    getDescriptionObject(){
        return {
            "id": this.id,
            "text": this.text,
            "priority": this.priority,
            "done": this.done,
            "duedate": this.duedate,
            "tag":this.tag
        }
    }
}
