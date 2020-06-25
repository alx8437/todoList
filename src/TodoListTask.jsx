import React from 'react';

class TodoListTask extends React.Component {

    state = {
        editMode: false,
        title: this.props.task.title
    }

    isEditModeActivated = () => {
        this.setState({editMode: true,})
    }

    isEditModeDeActivated = () => {
        this.props.changeStatusTitle(this.props.task, this.state.title)
        this.setState({
            editMode: false
        })
    }

    onTitleChange = (e) => {
        this.setState({title: e.currentTarget.value})
    }


    onIsDoneChanged = (event) => {
        let status = event.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task, status);
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.isEditModeDeActivated();
        }
    }

    dellTask = () => {
        this.props.dellTask(this.props.task.id)
    }


    render = () => {
        let statusTask = this.props.task.status;
        let taskIsDoneClass = statusTask === 2 ? 'todoList-task done' : 'todoList-task';

        return (
            <div className={taskIsDoneClass}>
                <div>
                    <input
                        onChange={this.onIsDoneChanged}
                        type="checkbox"
                        checked={statusTask === 2}
                    />
                    {this.state.editMode ?
                        <input
                            value={this.state.title}
                            autoFocus={true}
                            onBlur={this.isEditModeDeActivated}
                            onChange={this.onTitleChange}
                            onKeyPress={this.onKeyPress}
                        />
                        : <span
                            onClick={this.isEditModeActivated}>
                            {this.props.task.id} - {this.props.task.title}: {this.props.task.priority}
                    </span>
                    }
                    <span onClick={this.dellTask} className={"dellTask"}>del</span>
                </div>
            </div>
        )
    }
}



export default TodoListTask;