import {createStore} from "redux";

const ADD_TODOLIST = "ADD_TODOLIST";
const ADD_TASK = "ADD_TASK"

const initialState = {
    todolists: [
        {id: 0, title: "JS", tasks: []},
        {id: 1, title: "React", tasks: []}
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };
        case ADD_TASK:
            return { ...state,
                todolists: [...state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })]
            }
        default:
            return state
    }

};


export const addTodoListActionCreater = (newTodoList) => {
    return {
        type: ADD_TODOLIST,
        newTodoList
    }

};

export const addTaskActionCreater = (todoListId, newTask) => {
   return {
       type: ADD_TASK,
       todoListId,
       newTask
   }
}



const store = createStore(reducer);

export default store

