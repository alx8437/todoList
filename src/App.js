import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {



    state = {
        tasks: [

        ],
        filterValue: "All"
    };

    nextTaskId = this.state.tasks === 0 ? 0 : this.state.tasks.length



    saveState = () => {
        let stateAsSting = JSON.stringify(this.state);
        localStorage.setItem("ourstate", stateAsSting)
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem("ourstate");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state)

    }

    componentDidMount() {
        this.restoreState()
    }

    addTaskList = (newText) => {
        let newTask = {id: this.nextTaskId, title: newText, isDone: false, priority: "low"};
        let newTasks = [...this.state.tasks, newTask];
        this.nextTaskId += 1
        this.setState( {
            tasks: newTasks
        }, () => this.saveState());

    };

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue:newFilterValue
        })
    };

    changeTask = (taskID, obj) => {
        let newTask = this.state.tasks.map(t => {
            if (t.id != taskID) {
                return t
            } else {
                return {...t, ...obj}
            }
        });
        this.setState({
            tasks: newTask
        })
    }


    changeStatus = (taskID, isDone) => {
        this.changeTask(taskID, {isDone: isDone})
    };



    changeStatusTitle = (taskID, title) => {
        this.changeTask(taskID, {title: title})
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
                <div  className="todoList">
                    <TodoListHeader
                        addTaskList={this.addTaskList}
                    />
                    <TodoListTasks
                        tasks={this.filterTask()}
                        changeStatus={this.changeStatus}
                        changeStatusTitle={this.changeStatusTitle}
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