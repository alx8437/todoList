import React from "react";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListActionCreator, setTodoLists} from "./reducer";
import axios from 'axios';



class App extends React.Component {



    newTodoListId = 2;

    addTodoList = (title) => {
        axios.post(
            "https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title: title},
            {
                withCredentials: true,
                headers: {"API-KEY": "e655fc0d-99c3-4c81-8dea-0837243fe8bf"}
            }
        )
            .then(res => {
                let todoList = res.data.data.item
                this.props.addTodoList(todoList)
            })

    };

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {withCredentials: true})
            .then(res => {
                this.props.setTodoLists(res.data)
            })
    }



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
        },
        setTodoLists: (todoLists) => {
            dispatch(setTodoLists(todoLists))
        }
    }


};


const ContainerApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ContainerApp;

