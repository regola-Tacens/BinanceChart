import { useRecoilState } from 'recoil'
import { limit, symbol } from '../../state/atoms'
import { Limit,Symbol } from '../../types'
import './styles.css'

const Actions = () => {
  const [, setApiLimit] = useRecoilState<Limit>(limit)
  const [, setApiCoin] = useRecoilState<Symbol>(symbol)

  const handleHourChange = (actionLimit:Limit) => {
    setApiLimit(actionLimit)
  }

  const handleCoinChange = (coin:Symbol) => {
    setApiCoin(coin)
  }
  return (
    <>
      <div className="btn-container">
          <div className="btn btnLastHour" onClick={()=>handleHourChange(60)}>Last Hour</div>
          <div className="btn" onClick={()=>handleHourChange(300)}>Last 5 hours</div>
          <div className="btn btnLast10Hours" onClick={()=>handleHourChange(600)}>Last 10 Hours</div>
      </div>
      <div className="btn-container">
          <div className="btn-container_btn bitcoinBtn" onClick={()=>handleCoinChange("BTCUSDT")}>
            <img className="currencyIcon" src="/bitcoin.svg" alt="svg button" />
          </div>
          <div className="btn-container_btn" onClick={()=>handleCoinChange('AVAXUSDT')}>
           <img className="currencyIcon" src="/avax.svg" alt="svg button" />
          </div>
          <div className="btn-container_btn" onClick={()=>handleCoinChange('ETHUSDT')}>
           <img className="currencyIcon" src="/ethereum.svg" alt="svg button" />
          </div>
          <div className="btn-container_btn" onClick={()=>handleCoinChange('SOLUSDT')}>
           <img className="currencyIcon" src="/solana.svg" alt="svg button" />
          </div>
      </div>

    </>
  )
}

export default Actions

