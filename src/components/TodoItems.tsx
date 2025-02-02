import React from 'react';
import { TodoItem } from '../types/TodoTypes'; // Ensure this is imported
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import delete_icon from '../assets/delete.png';

interface TodoItemsProps {
  item: TodoItem;
  handleDeleteItem: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoItems: React.FC<TodoItemsProps> = ({
  item,
  handleDeleteItem,
  toggleTodo
}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div className='flex flex-1 items-center cursor-pointer' onClick={() => toggleTodo(item.id)}>
            <img src={item.isCompleted ? not_tick : tick} alt="" className='w-7 h-7'/>
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${item.isCompleted ? 'line-through' : ''}`}>
              {item.text}
            </p>
        </div>
        <img onClick={() => handleDeleteItem(item.id)} className='w-3.5 h-3.5 cursor-pointer' src={delete_icon} alt="" />
    </div>
  )
}

export default TodoItems;
