import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TotoListTitle";
import {connect} from "react-redux";
import {addTask, changeTask, changeTodoList, dellTask, dellTodoList, setTasks} from "./reducer";


class TodoList extends React.Component {

    state = {
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState()
    }


    addTask = (newText) => {
        this.props.addTask(newText, this.props.id)
    };

    restoreState = () => {
        this.props.setTasks(this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };

    changeTask = (task, obj) => {
        this.props.changeTask(this.props.id, task.id, task, obj)
    }


    changeStatus = (task, status) => {
        this.changeTask(task, {status})
    };


    changeStatusTitle = (task, title) => {
        this.changeTask(task, {title})
    };


    dellTask = (taskId) => {
        this.props.dellTask(this.props.id, taskId)
    }

    dellTodoList = () => {
        this.props.dellTodoList(this.props.id)
   }

    changeTodoList = (title) => {
        this.props.changeTodoList(this.props.id, title)
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


const ConnectTodoList = connect(null, {
    addTask,
    changeTask,
    dellTask,
    dellTodoList,
    setTasks,
    changeTodoList
})(TodoList)

export default ConnectTodoList;