import {api} from "./api";
import {TaskType, TodoType} from "./types/entities";

const ADD_TODOLIST_SUCCESS = "ADD_TODOLIST_SUCCESS";
const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
const CHANGE_TASK_SUCCESS = "CHANGE_TASK_SUCCESS";
const DELL_TASK_SUCCESS = "DELL_TASK_SUCCESS";
const DELL_TODOLIST_SUCCESS = "DELL_TODOLIST_SUCCESS";
const SET_TODOLIST_SUCCESS = "SET_TODOLIST_SUCCESS";
const SET_TASKS_SUCCESS = "SET_TASKS_SUCCESS";
const CHANGE_TODOLIST_SUCCESS = "CHANGE_TODOLIST_SUCCESS";


type InitialStateType = {
    todolists: Array<TodoType>
}



const initialState: InitialStateType  = {
    todolists: [],
};






export const reducer = (state: InitialStateType = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: [...state.todolists, {...action.newTodoList, tasks: []}],
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                todolists: [...state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]};
                    } else {
                        return tl;
                    }
                })],
            };
        case CHANGE_TASK_SUCCESS:
            return {
                ...state,
                todolists: [...state.todolists.map(tl => {
                    if (tl.id === action.task.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(task => {
                                if (task.id !== action.task.id) {
                                    return task;
                                } else {
                                    return {...action.task};
                                }
                            }),
                        };
                    } else {
                        return tl;
                    }
                })],
            };
        case DELL_TASK_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: [...tl.tasks.filter(t => {
                                if (t.id !== action.taskID) {
                                    return t;
                                }
                            })],
                        };
                    }
                    return tl;
                }),
            };
        case DELL_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: [...state.todolists.filter(tl => {
                    if (tl.id !== action.todoListId) {
                        return tl;
                    }
                })],

            };
        case SET_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: action.todolists.map(tl => {
                    return {...tl, tasks: []};
                }),
            };
        case SET_TASKS_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todoListId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks};
                    }
                }),
            };
        case CHANGE_TODOLIST_SUCCESS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todoListId) {
                        return tl;
                    } else {
                        return {...tl, title: action.title};
                    }
                }),
            };
        default:
            return state;
    }
};


// actionCreators

type addTodoSuccessType = {
    type: string
    newTodoList: TodoType
}

export const addTodoListSuccess = (newTodoList: TodoType) => ({type: ADD_TODOLIST_SUCCESS, newTodoList});
export const addTaskSuccess = (todoListId: string, newTask: TaskType) => ({type: ADD_TASK_SUCCESS, todoListId, newTask});
export const changeTaskSuccess = (task: TaskType) => ({type: CHANGE_TASK_SUCCESS, task});
export const dellTaskSuccess = (todoListId: string, taskID: string) => ({type: DELL_TASK_SUCCESS, todoListId, taskID});
export const dellTodolistSuccess = (todoListId: string) => ({type: DELL_TODOLIST_SUCCESS, todoListId});
export const setTodoListsSuccess = (todolists: TodoType) => ({type: SET_TODOLIST_SUCCESS, todolists});
export const setTasksSuccess = (todoListId: string, tasks: Array<TaskType>) => ({type: SET_TASKS_SUCCESS, tasks, todoListId});
export const changeTodoListSuccess = (todoListId: string, title: string) => ({type: CHANGE_TODOLIST_SUCCESS, todoListId, title});


//Thunk


export const setTodoLists = () => (dispatch, getState) => {
    //requests to server
    api.getTodoList()
        .then(res => {
            //dispatch action
            dispatch(setTodoListsSuccess(res.data));
        });
};

export const addTodoList = (title) => (dispatch, getState) => {
    api.createTodoList(title)
        .then(res => {
            let todoList = res.data.item;
            dispatch(addTodoListSuccess(todoList));
        });
};

export const addTask = (newText, todoListId) => (dispatch, getState) => {
    api.postTasks(newText, todoListId)
        .then(res => {
            if (res.resultCode === 0) {
                let newTask = res.data.item;
                dispatch(addTaskSuccess(todoListId, newTask));
            }
        });
};

export const changeTask = (todoListId, taskId, task, obj) => (dispatch, getState) => {
    api.putChangeTask(todoListId, taskId, task, obj)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(changeTaskSuccess(response.data.item));
            }
        });
};

export const dellTask = (todoListId, taskId) => (dispatch, getState) => {
    api.deleteTask(todoListId, taskId)
        .then(response => {
            if (response.resultCode === 0) {
                dispatch(dellTaskSuccess(todoListId, taskId));
            }
        });
};

export const dellTodoList = (todoListId) => (dispatch, getState) => {
    api.deleteTodoList(todoListId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(dellTodolistSuccess(todoListId));
            }
        });
};

export const setTasks = (todoListId) => (dispatch, getState) => {
    api.getTasks(todoListId)
        .then(res => {
            if (!res.error) {
                dispatch(setTasksSuccess(todoListId, res.items));
            }
        });
};

export const changeTodoList = (todoListId, title) => (dispatch, getState) => {
    api.updateTodolistTitle(todoListId, title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(changeTodoListSuccess(todoListId, title));
            }
        });
};