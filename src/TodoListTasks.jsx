import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    // Происходит что то такое
    // let data = { title: "JQuery", isDone: false }
    // let newTask = new TodoListTask(data)
    // newTask.render();

    render = () => {

        let myFn = (t) => {
            return <TodoListTask task={t} changeStatus={this.props.changeStatus}/>
        };
        let taskElements = this.props.tasks.map(myFn);
        return (
            <div className="todoList-tasks">

                { taskElements }

            </div>
        )
    }

}

export default TodoListTasks;