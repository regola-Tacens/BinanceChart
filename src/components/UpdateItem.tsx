import { useState } from 'react'
import { useRecoilState } from "recoil"
import { todoListState } from "../state/atoms"

export const UpdateItem = () => {
  const [inputValue, setInputValue] = useState("")
  const [items, setItem] = useRecoilState(todoListState)

  const getId = (): number => {
    const allIds = items.map( (item) => item.id)
    const maxId= Math.max(...allIds)
    return maxId +1
  }

  getId()

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = () => {
    setItem((oldToDoList) => [...oldToDoList, {id: getId(), text: inputValue, isComplete: true}])
  }

  return (
    <div>
      Update Item
        <input type="text" onChange={handleChangeValue}></input>
        <button onClick={handleSubmit}>go</button>  
    </div>
  )
}