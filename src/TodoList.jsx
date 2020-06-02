import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TotoListTitle";
import {connect} from "react-redux";
import {addTaskActionCreator, changeTaskActionCreator} from "./store";



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
        let todoListId = this.props.id
        let newTask = {id: this.nextTaskId, title: newText, isDone: false, priority: "low"};
        this.nextTaskId += 1

        this.props.addTask(todoListId, newTask)

    };

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue:newFilterValue
        })
    };

    changeTask = (taskID, obj) => {
        let todoListId = this.props.id
        let newTask = this.state.tasks.map(t => {
            if (t.id != taskID) {
                return t
            } else {
                return {...t, ...obj}
            }
        });

        // this.setState({
        //     tasks: newTask
        // })

        this.props.changeTask(todoListId, taskID, obj)
    }


    changeStatus = (taskID, isDone) => {
        let todoListId = this.props.id
        this.props.changeTask(todoListId, taskID, {isDone})
    };



    changeStatusTitle = (taskID, title) => {
        this.changeTask(taskID, {title})
    };




    render = () => {


        return (
            <div className="todoList">
                <div>
                    <TodoListTitle title={this.props.title}/>
                    <AddNewItemForm addItem={this.addTask}
                    />
                    <TodoListTasks
                        tasks={this.props.tasks.filter(t => {
                            if (this.state.filterValue === "All") {
                                return true;
                            }
                            if (this.state.filterValue === "Active") {
                                return t.isDone === false;
                            }
                            if (this.state.filterValue === "Completed") {
                                return t.isDone === true;
                            }
                        })}
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

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todoListId, newTask) => {
            dispatch(addTaskActionCreator(todoListId, newTask))
        },
        changeTask: (todoListId, taskID, obj) => {
            dispatch(changeTaskActionCreator(todoListId, taskID, obj))
        }
    }
}


const ConnectTodoList = connect(null, mapDispatchToProps)(TodoList)

export default ConnectTodoList;