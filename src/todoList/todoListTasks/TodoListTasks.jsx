import React from 'react';
import classes from './TodoListTasks.module.css';

class TodoListTasks extends React.Component {
    render = () => {
        return (
            <div className={classes.task_wrapper}>
                <div className={classes.task}>
                    <input type="checkbox" checked={true}/>
                    <span>CSS</span>
                </div>
                <div className={classes.task}>
                    <input type="checkbox" checked={false}/>
                    <span>JS</span>
                </div>
                <div className={classes.task}>
                    <input type="checkbox" checked={false}/>
                    <span>ReactJS</span>
                </div>
                <div className={classes.task}>
                    <input type="checkbox" checked={true}/>
                    <span>Patterns</span>
                </div>
            </div>
        );
    }
}

export default TodoListTasks;