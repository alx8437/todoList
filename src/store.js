
const initialState = {
    todolists: [
        {id: 0, title: "JS"},
        {id: 1, title: "React"}
    ]
}

const reducer = (state = initialState, action) => {
    return state
}

const store = createStore(reducer);

export default store

