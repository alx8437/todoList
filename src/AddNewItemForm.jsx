import React from 'react';

class AddNewItemForm extends React.Component {
    constructor() {
        super();
    }

    state = {
        error: false,
        inputValue: ''
    }

    newInputValue = (e) => {
        this.setState({inputValue: e.currentTarget.value});
        this.setState({
            error: false
        })
    }

    onAddItemClick = () => {
        let newText = this.state.inputValue.trim();
        if (newText === "") {
            this.setState({
                error: true
            })
        } else {
            this.props.addItem(newText);
            this.state.inputValue = '';
        }
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    }


    render = () => {

        let classToError = this.state.error === true ? "error" : "input";

        return (
            <div className="todoList-header">
                <div className="todoList-newTaskForm">
                    <input
                        value={this.state.inputValue}
                        onChange={this.newInputValue}
                        className={classToError}
                        type="text"
                        placeholder="New item name"
                        onKeyPress={this.onKeyPress}
                    />
                    <button className={"button"} onClick={this.onAddItemClick}>Add</button>
                </div>
            </div>
        )
    }
}

export default AddNewItemForm;