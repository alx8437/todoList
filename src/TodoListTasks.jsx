import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {


    render = () => {

        let myFn = (t) => {
            return (
                <TodoListTask
                    task={t}
                    changeStatus={this.props.changeStatus}
                    changeStatusTitle={this.props.changeStatusTitle}
                    dellTask={this.props.dellTask}
                />
            )
        };

        let taskElements = this.props.tasks.map(myFn);
        return (
            <div className="todoList-tasks.isDone">

                {taskElements}

            </div>
        )
    }

}

export default TodoListTasks;