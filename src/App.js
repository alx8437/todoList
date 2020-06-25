import React from "react";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, setTodoLists} from "./reducer";


class App extends React.Component {

    addTodoList = (title) => {
        this.props.addTodoList(title);
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTodoLists();
    };


    render() {

        let todolists = this.props.todolists.map(td => <TodoList
            key={td.id}
            id={td.id}
            title={td.title}
            tasks={td.tasks}
        />);

        return (
            <div>
                <AddNewItemForm addItem={this.addTodoList}/>
                <div className="App">
                    {todolists}
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
    };
};


const ContainerApp = connect(mapStateToProps, {setTodoLists, addTodoList})(App);
export default ContainerApp;

