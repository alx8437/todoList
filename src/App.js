import React from "react";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";



class App extends React.Component {

    state = {
        todolists: [],
    };

    newTodoListId = 0;

    addTodoList = (title) => {
        let newTodoList = {id: this.newTodoListId, title: title};
        let newTodoLists = [...this.state.todolists, newTodoList];
        this.setState((state) => {
            return {todolists: newTodoLists}
        }, this.stateSaveLocalStorage);
        this.newTodoListId += 1
    };

    stateSaveLocalStorage = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('ourstatetdlist', stateAsString)
    };

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        let state = {
            todolists: [],
        };
        let stateAsString = localStorage.getItem('ourstatetdlist');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, ()=> this.state.todolists.forEach(td => {
            if (td.id > this.newTodoListId) {
                this.newTodoListId = td.id + 1;
            }
        }))
    };


    render() {

        let todolists = this.state.todolists.map(td => <TodoList key={td.id} id={td.id} title={td.title} />)

        return (
            <div>
                <AddNewItemForm
                    addItem={this.addTodoList}
                />
                <div className="App">
                    {todolists}
                </div>
            </div>
        )
    }

}

export default App

