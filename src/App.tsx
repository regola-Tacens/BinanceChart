import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getHistoricalSpotCandleStick } from './api/binanceAPI';
import CurrencyGraph from './components/CurrencyGraph';
import { currencies, limit } from './state/atoms';

function App() {
  const [ currenciesAtoms, setCurrenciesAToms] = useRecoilState(currencies)
  const apiLimit = useRecoilValue(limit)

  useEffect(()=> {
     getHistoricalSpotCandleStick('BTCUSDT','1m', apiLimit,'').then((response)=>{
      setCurrenciesAToms(response)
      })
  },[apiLimit,setCurrenciesAToms])

  return (
    <div className="App">
      {currenciesAtoms.length > 0 &&
      <CurrencyGraph />
        }
    </div>
  );
}

export default App;
