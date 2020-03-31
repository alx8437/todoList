import React from 'react';
import './App.css';
import TodoList from "./todoList/TodoList";

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <TodoList />
            </div>
        );
    }
}

export default App;

