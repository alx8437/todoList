import React from 'react';
import classes from './TodoListFooter.module.css';

class TodoListFooter extends React.Component {
    render = () => {
        return (
            <div className={classes.footer}>
                <button>All</button>
                <button>Completed</button>
                <button>Active</button>
            </div>
        );
    }
}

export default TodoListFooter;