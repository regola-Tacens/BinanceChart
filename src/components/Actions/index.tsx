import { useRecoilState } from 'recoil'
import { limit, symbol } from '../../state/atoms'
import { Limit,Symbol } from '../../types'
import './styles.css'

const Actions = () => {
  const [apiLimit, setApiLimit] = useRecoilState<Limit>(limit)
  console.log(apiLimit)
  const [apiCoin, setApiCoin] = useRecoilState<Symbol>(symbol)

  const handleHourChange = (actionLimit:Limit) => {
    setApiLimit(actionLimit)
  }

  const handleCoinChange = (coin:Symbol) => {
    console.log(coin)
    setApiCoin(coin)
  }
  return (
    <>
      <div className="btn-container">
          <div onClick={()=>handleHourChange(60)}>Last Hour</div>
          <div onClick={()=>handleHourChange(300)}>Last 5 hours</div>
          <div onClick={()=>handleHourChange(600)}>Last 10 Hours</div>
      </div>
      <div className="btn-container">
          <div className="currencyBtn" onClick={()=>handleCoinChange("BTCUSDT")}>Bitcoin</div>
          <div className="currencyBtn" onClick={()=>handleCoinChange('AVAXUSDT')}>Avax</div>
          <div className="currencyBtn" onClick={()=>handleCoinChange('ETHUSDT')}>Ethereum</div>
          <div className="currencyBtn" onClick={()=>handleCoinChange('SOLUSDT')}>Solana</div>
      </div>

    </>
  )
}

export default Actions