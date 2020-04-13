
import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            let newTask = {title: "CSS", isDone: true, priority: "low"};
            let newTasks = [...this.state.tasks, newTask];
            this.setState( {
                tasks: newTasks
            })
        }, 5000);
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

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

