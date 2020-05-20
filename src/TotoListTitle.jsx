import React from 'react';

class TodoListTitle extends React.Component {
    constructor(props) {
        super();
    }



    render = () => {

        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">{this.props.title}</h3>
            </div>
        )
    }
}

export default TodoListTitle;