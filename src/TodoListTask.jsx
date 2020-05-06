import React from 'react';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    }

    isEditModeActivated = () => {
        this.setState({
            editMode: true
        })
    }

    isEditModeDeActivated = () => {
        this.setState({
            editMode: false
        })
    }

    onTitleChange = (e) => {
        this.props.changeStatusTitle(this.props.task.id, e.currentTarget.value)
    }


    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task.id, event.currentTarget.checked);
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.isEditModeDeActivated();
        }
    }


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
                    {this.state.editMode ?
                        <input
                            value={this.props.task.title}
                            autoFocus={true}
                            onBlur={this.isEditModeDeActivated}
                            onChange={this.onTitleChange}
                            onKeyPress={this.onKeyPress}
                        />
                        : <span onClick={this.isEditModeActivated}> {this.props.task.id} - {this.props.task.title}: {this.props.task.priority}</span>
                    }
                </div>
            </div>
        )
    }
}

export default TodoListTask;