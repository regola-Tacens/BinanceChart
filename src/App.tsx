import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getHistoricalSpotCandleStick } from './api/binanceAPI';
import CurrencyGraph from './components/CurrencyGraph';
import PieGraph from './components/PieGraph';
import { currencies, limit, symbol } from './state/atoms';
import './index.css';
import HeaderNav from './components/HeaderNav/HeaderNav';

function App() {
  const [ currenciesAtoms, setCurrenciesAToms] = useRecoilState(currencies)
  const apiLimit = useRecoilValue(limit)
  const apiSymbol = useRecoilValue(symbol)
 
  useEffect(()=> {
     getHistoricalSpotCandleStick(apiSymbol,'1m', apiLimit,'').then((response)=>{
      setCurrenciesAToms(response)
      })
  },[apiLimit, apiSymbol,setCurrenciesAToms])
  console.log(currenciesAtoms)

  document.body.style.backgroundColor = "#1b1b1b"

  return (
    <div className="mainContainer dark">
      <HeaderNav />
      {currenciesAtoms.length > 0 &&
      <div className="app">
        <CurrencyGraph />
        <PieGraph />
      </div>
        }
    </div>
  );
}

export default App;
