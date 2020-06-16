import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TotoListTitle";
import {connect} from "react-redux";
import {addTaskActionCreator, changeTaskActionCreator, dellTaskAC, dellTodolistAC, setTasks} from "./reducer";
import axios from 'axios'


class TodoList extends React.Component {

    state = {
        filterValue: "All"
    };

    nextTaskId = 0

    componentDidMount() {
        this.restoreState()
    }


    addTask = (newText) => {
        axios.post(
            `https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {"API-KEY": "e655fc0d-99c3-4c81-8dea-0837243fe8bf"}
            }
        )
            .then(res => {
                if (res.data.resultCode === 0) {
                    let newTask = res.data.data.item
                    this.props.addTask(this.props.id, newTask)
                }
            })

    };

    restoreState = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
        {
            withCredentials: true,
            headers: {"API-KEY": "e655fc0d-99c3-4c81-8dea-0837243fe8bf"}
        },)
            .then(res => {
                if (!res.data.error) {
                    this.props.setTasks(this.props.id, res.data.items)
                }
            })

    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTask = (task, obj) => {
        axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            {...task, ...obj}, //Передаем таску с иммутабельно измененным свойством status
            {
                withCredentials: true,
                headers: {"API-KEY": "e655fc0d-99c3-4c81-8dea-0837243fe8bf"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.changeTask(response.data.data.item)
                }
            })
    }


    changeStatus = (task, status) => {
        let todoListId = this.props.id
        this.changeTask(task, {status})
    };


    changeStatusTitle = (taskID, title) => {
        this.changeTask(taskID, {title})
    };


    dellTask = (taskID) => {
        let todoListId = this.props.id
        this.props.dellTask(todoListId, taskID)
    }

    dellTodoList = () => {
        debugger
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "e655fc0d-99c3-4c81-8dea-0837243fe8bf"}
            }
        ).then(res => {
            if (res.data.resultCode === 0) {
                this.props.dellTodoList(this.props.id)
            }
        })

   }


    render = () => {

        return (
            <div className="todoList">
                <div>
                    <TodoListTitle
                        title={this.props.title}
                        dellTodoList={this.dellTodoList}
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
        }
    }


}


const ConnectTodoList = connect(null, mapDispatchToProps)(TodoList)

export default ConnectTodoList;