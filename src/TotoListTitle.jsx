import React from 'react';

class TodoListTitle extends React.Component {

    state = {
        editMode: false,
        title: this.props.title
    }

    onTitleChange = (e) => {
        this.setState({title: e.currentTarget.value})
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.isEditModeDeActivated();
        }
    }

    isEditModeActivated = () => {
        this.setState({editMode: true})
    }

    isEditModeDeActivated = () => {
        this.props.changeTodoList(this.state.title)
        this.setState({
            editMode: false
        })
    }

    dellTodoList = () => {
        this.props.dellTodoList()
    }



    render = () => {

        return (
            <div className="todoList-header">
                {this.state.editMode ?
                    <input
                        value={this.state.title}
                        autoFocus={true}
                        onBlur={this.isEditModeDeActivated}
                        onChange={this.onTitleChange}
                        onKeyPress={this.onKeyPress}
                    />
                    : <h3 className="todoList-header__title" onClick={this.isEditModeActivated}>{this.props.title}</h3>
                }
                <span onClick={this.dellTodoList} className="dellTask">del</span>
            </div>
        )
    }
}

export default TodoListTitle;