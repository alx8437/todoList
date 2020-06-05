import React from "react";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListActionCreator} from "./store";



class App extends React.Component {

    state = {
        todolists: [],
    };

    newTodoListId = 2;

    addTodoList = (title) => {

        let newTodoList = {id: this.newTodoListId, title: title, tasks: []};
        this.newTodoListId += 1

        this.props.addTodoList(newTodoList)

    };



    render() {

        let todolists = this.props.todolists.map(td => <TodoList key={td.id} id={td.id} title={td.title} tasks={td.tasks}/>)

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

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList) => {
            dispatch(addTodoListActionCreator(newTodoList))
        }
    }


};


const ContainerApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ContainerApp;

