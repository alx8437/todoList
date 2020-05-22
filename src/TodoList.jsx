import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TotoListTitle";



class TodoList extends React.Component {

    state = {
        tasks: [

        ],
        filterValue: "All"
    };

    nextTaskId = this.props.id



    saveState = () => {
        let stateAsSting = JSON.stringify(this.state);
        localStorage.setItem("ourstatetask-" + this.props.id, stateAsSting)
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem("ourstatetask-" + this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, ()=> this.state.tasks.forEach(t => {
            if (t.id > this.nextTaskId) {
                this.nextTaskId = t.id + 1;
            }
        }))
    }

    componentDidMount() {
        this.restoreState()
    }

    addTask = (newText) => {
        let newTask = {id: this.nextTaskId, title: newText, isDone: false, priority: "low"};
        let newTasks = [...this.state.tasks, newTask];
        this.nextTaskId += 1
        this.setState( (state) => {
            return {tasks: newTasks}
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
        this.changeTask(taskID, {isDone})
    };



    changeStatusTitle = (taskID, title) => {
        this.changeTask(taskID, {title})
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
            <div className="todoList">
                <div>
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}
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

export default TodoList;