import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    // Происходит что то такое
    // let data = { title: "JQuery", isDone: false }
    // let newTask = new TodoListTask(data)
    // newTask.render();

    render = () => {

        let taskElements = this.props.tasks.map(t => {
           return (
               <TodoListTask  title={t.title} isDone = {t.isDone} priority={t.priority}/>
           )
        })

        return (
            <div className="todoList-tasks">
                { taskElements }
            </div>
        )
    }
}

export default TodoListTasks;