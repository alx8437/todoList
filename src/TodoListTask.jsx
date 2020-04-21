import React from 'react';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(e);
    };


    render = () => {
        return (
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input
                        onChange={this.onIsDoneChanged}
                        type="checkbox"
                        checked={this.props.isDone}
                    />
                    <span>
                        {this.props.title}: {this.props.priority}
                    </span>
                </div>
            </div>
        )
    }
}

export default TodoListTask;