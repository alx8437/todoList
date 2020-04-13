import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    tasks = [
        {title: "CSS", isDone: true, priority: "low"},
        {title: "JS", isDone: false, priority: "hight"},
        {title: "ReactJS", isDone: false, priority: "hight"},
        {title: "JQuery", isDone: true, priority: "low"},
        {title: "Patterns", isDone: true, priority: "low"}
    ];


    filterValue = "All";

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

