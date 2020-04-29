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

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue:newFilterValue
        })
    };

    changeStatus = (task, isDone) => {
      let newTasks = this.state.tasks.map(t => {
          if (t === task) {
              return {...t, isDone: isDone}
          }
          return t;
      });
      this.setState({
          tasks: newTasks
      })
    };


    filterTask = () => {
        if (this.state.filterValue === "All") {
            return this.state.tasks;
        } else if (this.state.filterValue === "Completed") {
            return this.state.tasks.filter(t => t.isDone === true)
        } else if (this.state.filterValue === "Active") {
            return this.state.tasks.filter((t => t.isDone === false))
        }
    };

    render = () => {


        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader
                        addTaskList={this.addTaskList}
                    />
                    <TodoListTasks
                        tasks={this.filterTask()}
                        changeStatus={this.changeStatus}
                    />
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}

export default App;