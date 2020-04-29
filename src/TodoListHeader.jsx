  import React from 'react';

class TodoListHeader extends React.Component {
    constructor() {
        super();
        this.newTaskRef = React.createRef()
    }

    state = {
      error: false
    };


    onAddTaskList = () => {
        let newText = this.newTaskRef.current.value.trim();
        if (newText === "") {
            this.setState({
                error: true
            })
        } else {
            this.props.addTaskList(newText);
            this.newTaskRef.current.value = '';
        }

    };



    render = () => {

        let classToError = this.state.error === true ? "error" : "";

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input
                        className={classToError}
                        type="text"
                        placeholder="New task name"
                        ref={this.newTaskRef}

                    />
                    <button
                        onClick={this.onAddTaskList}
                    >Add</button>
                </div>
            </div>
        )
    }
}

export default TodoListHeader;