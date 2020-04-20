import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from 'prop-types';

class App extends React.Component {


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

    addTaskList = (newText) => {
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
                    <TodoListHeader
                        addTaskList={this.addTaskList}
                    />
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;