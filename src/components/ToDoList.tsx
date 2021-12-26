import { useRecoilState, useRecoilValue } from "recoil" 
import { todoListState } from '../state/atoms'

export const ToDoList = () => {
  const todoList = useRecoilValue(todoListState)
  const [items, setItems] = useRecoilState(todoListState)

  const handleEraseToDo = (id:Number): void => {
    setItems((oldToDoList) => 
      oldToDoList.filter((item) => item.id !== id)
    )
  }
  
  return (
    <div>
      {todoList.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => handleEraseToDo(todo.id)}>X</button>
        </div>
      ))}
    </div>
  )
}