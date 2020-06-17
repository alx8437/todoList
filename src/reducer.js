const ADD_TODOLIST = "ADD_TODOLIST";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK = "CHANGE_TASK";
const DELL_TASK = "DELL_TASK";
const DELL_TODOLIST = "DELL_TODOLIST";
const SET_TODOLIST = "SET_TODOLIST";
const SET_TASKS = "SET_TASKS";



const initialState = {
    todolists: []
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, {...action.newTodoList, tasks: []} ]
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
                    if (tl.id === action.task.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(task => {
                                debugger
                                if (task.id !== action.task.id) {
                                    return task
                                } else {
                                    return {...action.task}
                                }
                            })
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
                })]

            }
        case SET_TODOLIST:
            return {
                ...state,
                todolists: action.todolists.map(tl => {
                   return { ...tl, tasks: []}
                })
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todoListId) {
                        return tl
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
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
export const changeTaskActionCreator = (task) => {
    return {
        type: CHANGE_TASK,
        task
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

export const setTasks = (todoListId, tasks) => {
    return {
        type: SET_TASKS,
        tasks,
        todoListId
    }
}