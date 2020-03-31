import React from 'react';
import classes from './TodoList.module.css'
import TodoListHeader from "./todoListHeader/TodoListHeader";
import TodoListTasks from "./todoListTasks/TodoListTasks";
import TodoListFooter from "./todoListFooter/TodoListFooter";

class TodoList extends React.Component {
    render = () => {
        return (
            <div className={classes.todoList}>
                <TodoListHeader />
                <TodoListTasks />
                <TodoListFooter />
            </div>
        );
    }
}

export default TodoList;