
import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from 'prop-types';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef()
    }

    state = {
        tasks: [
            {title: "CSS", isDone: true, priority: "low"},
            {title: "JS", isDone: false, priority: "hight"},
            {title: "ReactJS", isDone: false, priority: "hight"},
            {title: "JQuery", isDone: true, priority: "low"},
            {title: "Patterns", isDone: true, priority: "low"}
        ],
        filterValue: "All"
    };

    onAddTaskList = () => {
        let newText = this.newTaskTitleRef.current.value;
        this.newTaskTitleRef.current.value = '';
        let newTask = {title: newText, isDone: false, priority: "low"};
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        })
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                            <button onClick={this.onAddTaskList}>Add</button>
                        </div>
                    </div>
                    {/*<TodoListHeader />*/}
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;
