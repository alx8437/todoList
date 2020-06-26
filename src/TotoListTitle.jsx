import React from 'react';
import CloseButton from "./CloseButton";

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
            <div className="todoList-title">
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
                <CloseButton dellEntity={this.dellTodoList}/>
            </div>
        )
    }
}

export default TodoListTitle;