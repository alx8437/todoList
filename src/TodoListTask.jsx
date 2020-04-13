import React from 'react';

class TodoListTask extends React.Component {
//*Происходит что то такое
//*constructor(attributes)
//*this.props = {}
//*this.props.title = attributes.title
//*this.props.isDobe = attributes.true
    render = () => {
        return (
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input type="checkbox" checked={this.props.isDone}/>
                    <span>{this.props.title}: {this.props.priority}</span>
                </div>
            </div>
        )
    }
}

export default TodoListTask;