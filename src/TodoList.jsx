import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TotoListTitle";
import {connect} from "react-redux";
import {
    addTaskActionCreator,
    changeTaskActionCreator,
    changeTodoList,
    dellTaskAC,
    dellTodolistAC,
    setTasks
} from "./reducer";
import axios from 'axios'
import {api} from "./api";


class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };

    nextTaskId = 0

    componentDidMount() {
        this.restoreState()
    }


    addTask = (newText) => {
            api.postTasks(newText, this.props.id)
            .then(res => {
                if (res.resultCode === 0) {
                    let newTask = res.data.item
                    this.props.addTask(this.props.id, newTask)
                }
            })
    };

    restoreState = () => {
        api.getTasks(this.props.id)
            .then(res => {
                if (!res.error) {
                    this.props.setTasks(this.props.id, res.items)
                }
            })
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTask = (task, obj) => {
        api.putChangeTask(this.props.id, task.id, task, obj)
            .then(response => {
                if (response.resultCode === 0) {
                    debugger
                    this.props.changeTask(response.data.item)
                }
            })
    }


    changeStatus = (task, status) => {
        this.changeTask(task, {status})
    };


    changeStatusTitle = (task, title) => {
        this.changeTask(task, {title})
    };


    dellTask = (taskID) => {
        api.deleteTask(this.props.id, taskID)
            .then(response => {
                if (response.resultCode === 0) {
                    this.props.dellTask(this.props.id, taskID)
                }
            })
    }

    dellTodoList = () => {
        api.deleteTodoList(this.props.id)
            .then(res => {
            if (res.resultCode === 0) {
                this.props.dellTodoList(this.props.id)
            }
        })
   }

    changeTodoList = (title) => {
        api.updateTodolistTitle(this.props.id, title)
            .then(res => {
                this.props.changeTodoList(res)
            })
    }


    render = () => {

        return (
            <div className="todoList">
                <div>
                    <TodoListTitle
                        title={this.props.title}
                        dellTodoList={this.dellTodoList}
                        changeTodoList={this.changeTodoList}
                    />
                    <AddNewItemForm addItem={this.addTask}
                    />
                    <TodoListTasks
                        tasks={this.props.tasks.filter(t => {
                            if (this.state.filterValue === "All") {
                                return true;
                            }
                            if (this.state.filterValue === "Active") {
                                return t.status === 0;
                            }
                            if (this.state.filterValue === "Completed") {
                                return t.status === 2;
                            }
                        })}
                        changeStatus={this.changeStatus}
                        changeStatusTitle={this.changeStatusTitle}
                        dellTask={this.dellTask}
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
        changeTask: (task) => {
            dispatch(changeTaskActionCreator(task))
        },
        dellTask: (todoListId, taskID) => {
            dispatch(dellTaskAC(todoListId, taskID))
        },
        dellTodoList: (todoListId) => {
            dispatch(dellTodolistAC(todoListId))
        },
        setTasks: (todoListId, tasks) => {
            dispatch(setTasks(todoListId, tasks))
        },
        changeTodoList: (todoListId, title) => {
            dispatch(changeTodoList(todoListId, title))
        }
    }
}


const ConnectTodoList = connect(null, mapDispatchToProps)(TodoList)

export default ConnectTodoList;