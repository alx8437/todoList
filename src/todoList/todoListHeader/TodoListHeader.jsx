import React from 'react';
import classes from './TodoListHeader.module.css';

class TodoListHeader extends React.Component {
    render = () => {
        return (
            <div className={classes.header}>
                <h3 className={classes.title}>What to Learn</h3>
                <div className={classes.newTaskForm}>
                    <input type="text" placeholder="New task name"/>
                    <button>Add</button>
                </div>
            </div>
        );
    }

}

export default TodoListHeader;