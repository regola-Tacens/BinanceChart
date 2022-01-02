import { useRecoilState } from 'recoil'
import { limit } from '../../state/atoms'
import { Limit } from '../../types'
import './styles.css'

const Actions = () => {
  const [apiLimit, setApiLimit] = useRecoilState<Limit>(limit)
  console.log(apiLimit)

  const handleHourChange = (actionLimit:Limit) => {
    console.log(actionLimit)
    setApiLimit(actionLimit)
  }
  return (
    <div className="btn-container">
      <div onClick={()=>handleHourChange(60)}>Last Hour</div>
      <div onClick={()=>handleHourChange(300)}>Last 5 hours</div>
      <div onClick={()=>handleHourChange(600)}>Last 10 Hours</div>
    </div>
  )
}

export default Actions