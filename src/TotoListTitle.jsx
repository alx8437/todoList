import React from 'react';

class TodoListTitle extends React.Component {


    dellTodoList = () => {
        this.props.dellTodoList()
    }



    render = () => {

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
                <span onClick={this.dellTodoList} className="dellTask">del</span>
            </div>
        )
    }
}

export default TodoListTitle;