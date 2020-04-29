  import React from 'react';

class TodoListHeader extends React.Component {
    constructor() {
        super();
        this.newTaskRef = React.createRef()
    }

    onAddTaskList = () => {
        let newText = this.newTaskRef.current.value;
        this.props.addTaskList(newText);
        this.newTaskRef.current.value = '';
    };



    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input
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