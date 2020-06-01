import {createStore} from "redux";

const ADD_TODOLIST = "ADD_TODOLIST";

const initialState = {
    todolists: [
        {id: 0, title: "JS", tasks: []},
        {id: 1, title: "React", tasks: []}
    ]
}

const reducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };
        default:
            return state
    }

};


export const addTodoListActionCreater = (newTodoList) => {
    debugger
    return {
        type: ADD_TODOLIST,
        newTodoList
    }

};




const store = createStore(reducer);

export default store

