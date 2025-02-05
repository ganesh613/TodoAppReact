import { createSlice } from "@reduxjs/toolkit"

export interface TodoState  {
    id: number
    text: string
    isCompleted: boolean
}

interface TodoListItem {
    todos: TodoState[]
}

const initialState: TodoListItem = {
    todos: []
}

const todoSlice = createSlice({
    name:'todos',
    initialState,
    reducers: {
        addTodo:(state,action) => {
            state.todos.push(action.payload)
        },
        updateCompletedStatus:(state,action)=>{
            const updatedTodos = state.todos.map(item => item.id === action.payload.id ? {...item,isCompleted: !item.isCompleted} : item) 
            state.todos = updatedTodos;
        },
        deleteTodoItem:(state,action)=>{
            state.todos.splice(action.payload.id,1)
        }
    }
})

export const {addTodo,updateCompletedStatus,deleteTodoItem} = todoSlice.actions
export default todoSlice.reducer;