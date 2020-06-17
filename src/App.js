import React from "react";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListActionCreator, setTodoLists} from "./reducer";
import axios from 'axios';
import {api} from "./api";


class App extends React.Component {


    newTodoListId = 2;

    addTodoList = (title) => {
        api.createTodoList(title)
            .then(res => {
                let todoList = res.data.item
                this.props.addTodoList(todoList)
            })

    };

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        api.getTodoList()
            .then(res => {
                this.props.setTodoLists(res.data)
            })
    }


    render() {

        let todolists = this.props.todolists.map(td => <TodoList key={td.id} id={td.id} title={td.title}
                                                                 tasks={td.tasks}/>)

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
    debugger
    return {
        todolists: state.todolists
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList) => {
            dispatch(addTodoListActionCreator(newTodoList))
        },
        setTodoLists: (todoLists) => {
            dispatch(setTodoLists(todoLists))
        }
    }


};


const ContainerApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ContainerApp;

