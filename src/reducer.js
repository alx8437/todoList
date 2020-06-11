const ADD_TODOLIST = "ADD_TODOLIST";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK = "CHANGE_TASK";
const DELL_TASK = "DELL_TASK";
const DELL_TODOLIST = "DELL_TODOLIST";
const SET_TODOLIST = "SET_TODOLIST";



const initialState = {
    todolists: []
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            debugger
            return {
                ...state,
                todolists: [...state.todolists, action.newTodoList]
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: [...state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })]
            }
        case CHANGE_TASK:
            return {
                ...state,
                todolists: [...state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl, tasks: [...tl.tasks.map(task => {
                                if (task.id !== action.taskID) {
                                    return task
                                } else {
                                    return {
                                        ...task, ...action.obj
                                    }
                                }
                            })]
                        }
                    } else {
                        return tl
                    }
                })]
            }
        case DELL_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks.filter(t => {
                                if (t.id !== action.taskID) {
                                    return t
                                }
                            })]
                        }
                    }
                    return tl
                })
            }
        case DELL_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists.filter(tl => {
                    if (tl.id !== action.todoListId) {
                        return tl
                    }
                    debugger
                })]

            }
        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists.map(tl => {
                   return { ...tl, tasks: []}
                })
            }
        default:
            return state
    }



};

export const addTodoListActionCreator = (newTodoList) => {
    return {
        type: ADD_TODOLIST,
        newTodoList
    }

};
export const addTaskActionCreator = (todoListId, newTask) => {
    return {
        type: ADD_TASK,
        todoListId,
        newTask
    }
}
export const changeTaskActionCreator = (todoListId, taskID, obj) => {
    return {
        type: CHANGE_TASK,
        todoListId,
        taskID,
        obj
    }
}
export const dellTaskAC = (todoListId, taskID) => {
    return {
        type: DELL_TASK,
        todoListId,
        taskID
    }
}
export const dellTodolistAC = (todoListId) => {
    return {
        type: DELL_TODOLIST,
        todoListId
    }
}

export const setTodoLists = (todolists) => {
    return {
        type: SET_TODOLIST,
        todolists
    }
}