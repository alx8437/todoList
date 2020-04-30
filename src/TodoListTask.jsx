import React from 'react';

class TodoListTask extends React.Component {

    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task, event.currentTarget.checked);
    };


    render = () => {

        let taskIsDoneClass = this.props.task.isDone ? 'todoList-task done' : 'todoList-task'

        return (
            <div className={taskIsDoneClass}>
                <div>
                    <input
                        onChange={this.onIsDoneChanged}
                        type="checkbox"
                        checked={this.props.task.isDone}
                    />
                    <span>
                        {this.props.task.title}: {this.props.task.priority}
                    </span>
                </div>
            </div>
        )
    }
}

export default TodoListTask;