import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: {"API-KEY": "e655fc0d-99c3-4c81-8dea-0837243fe8bf"}
})

export const api = {
    createTodoList(title) {
        return instance.post(
            ``,
            {title: title},
        )
            .then(res => res.data)
    },
    getTodoList() {
        return instance.get(``
        )
            .then(res => res)
    },
    postTasks(newText, todolisId) {
        return instance.post(
            `${todolisId}/tasks`,
            {title: newText},
        )
            .then(res => res.data)
    },
    getTasks(todoListId) {
        return instance.get(`${todoListId}/tasks`)
            .then(res => res.data)
    },
    putChangeTask(todoListId, taskID, task, obj) {
        return instance.put(
            `${todoListId}/tasks/${taskID}`,
            {...task, ...obj}, //Передаем таску с иммутабельно измененным свойством status
        )
            .then(res => res.data)
    },
    deleteTask(todoListId, taskID) {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskID}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "e655fc0d-99c3-4c81-8dea-0837243fe8bf"}
            }
        )
            .then(res => res.data)
    },
    deleteTodoList(todoListId) {
        return instance.delete(`${todoListId}`,
        )
            .then(res => res.data)
    },
    updateTodolistTitle(todolistId, title) {
        return instance.put(
            `${todolistId}`,
            {title: title}
        )
            .then(res => res.data)
    }
}