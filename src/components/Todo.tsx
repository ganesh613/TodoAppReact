import { useRef, useState } from 'react'
import todoIcon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import { TodoItem } from '../types/TodoTypes'

const Todo = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([])
    const [activeList, setActiveList] = useState<TodoItem[]>([])
    const [completedList, setCompletedList] = useState<TodoItem[]>([])

    const inputRef = useRef<HTMLInputElement>(null)

    const handleAddItem = (): void => {
        let inputText = ""
        if (inputRef.current) {
            inputText = inputRef.current.value.trim()
        }

        if (!inputText.length) {
            alert('Please add some text for task....')
            return
        }

        const newTodo: TodoItem = {
            id: Math.random(),
            text: inputText,
            isCompleted: false,
        }

        const currentItem = [...todoList, newTodo]
        console.log("list add", currentItem)
        setTodoList(currentItem)
        setActiveList(currentItem.filter(item => !item.isCompleted))
        setCompletedList(currentItem.filter(item => item.isCompleted))
        if (inputRef.current) inputRef.current.value = ""
    }

    const handleDeleteItem = (id: number): void => {
        const updatedList = todoList.filter(item => item.id !== id)
        setTodoList(updatedList)
        setActiveList(updatedList.filter(item => !item.isCompleted))
        setCompletedList(updatedList.filter(item => item.isCompleted))
    }

    const toggleTodo = (id: number): void => {
        const updatedList = todoList.map(item => {
            if (item.id === id) {
                return { ...item, isCompleted: !item.isCompleted }
            }
            return item
        })
        setTodoList(updatedList)
        console.log("toggle", updatedList)
        setActiveList(updatedList.filter(item => !item.isCompleted))
        setCompletedList(updatedList.filter(item => item.isCompleted))
    }

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            <div className='flex items-center mt-[7px] gap-2'>
                <img src={todoIcon} alt="Todo Icon" className='w-8' />
                <h1 className='text-3xl font-semibold'>To-do List</h1>
            </div>

            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input
                    ref={inputRef}
                    className='bg-transparent outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text"
                    placeholder='Add your task'
                />
                <button
                    onClick={handleAddItem}
                    className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'
                >
                    Add +
                </button>
            </div>

            <div>
                {(activeList.length > 0 || completedList.length > 0) && (
                    <h1>Active List {`(${activeList.length})`}</h1>
                )}
                {activeList.map((item) => (
                    <TodoItems
                        key={item.id}
                        item={item}
                        handleDeleteItem={handleDeleteItem}
                        toggleTodo={toggleTodo}
                    />
                ))}
            </div>

            <div>
                {completedList.length > 0 && (
                    <h1>Completed List {`(${completedList.length})`}</h1>
                )}
                {completedList.map((item) => (
                    <TodoItems
                        key={item.id}
                        item={item}
                        handleDeleteItem={handleDeleteItem}
                        toggleTodo={toggleTodo}
                    />
                ))}
            </div>
        </div>
    )
}

export default Todo
