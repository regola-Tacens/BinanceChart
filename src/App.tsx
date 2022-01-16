import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getHistoricalSpotCandleStick } from './api/binanceAPI';
import CurrencyGraph from './components/CurrencyGraph';
import PieGraph from './components/PieGraph';
import { currencies, darkMode, limit, symbol } from './state/atoms';
import './index.css';
import HeaderNav from './components/HeaderNav/HeaderNav';

function App() {
  const [ currenciesAtoms, setCurrenciesAToms] = useRecoilState(currencies)
  const apiLimit = useRecoilValue(limit)
  const apiSymbol = useRecoilValue(symbol)
  const mode = useRecoilValue(darkMode)
 
  console.log('mode: ', mode)
  useEffect(()=> {
     getHistoricalSpotCandleStick(apiSymbol,'1m', apiLimit,'').then((response)=>{
      setCurrenciesAToms(response)
      })
  },[apiLimit, apiSymbol,setCurrenciesAToms])

  useEffect(() => {
    mode === true ?
    document.body.style.backgroundColor = "#1b1b1b"
    :
    document.body.style.backgroundColor = "white"

  },[mode])

  return (
    <div className={`mainContainer ${mode && 'dark'}`}>
      <HeaderNav />
      {currenciesAtoms.length > 0 &&
      <div className="app">
        <div className="graph">
          <CurrencyGraph />
        </div>
        <div className="pie">
          <PieGraph />
          {/* <PieGraph /> */}
        </div>
      </div>
        }
    </div>
  );
}

export default App;
