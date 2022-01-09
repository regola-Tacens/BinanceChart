import  { useState, useEffect } from 'react'
import { useRecoilValue } from "recoil"
import { getHistoricalSpotCandleStick } from '../../api/binanceAPI'
import { limit } from "../../state/atoms"
import { sumOfTrade } from '../../types'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = () => {
  // getting apiLimt selected
  const apiLimit = useRecoilValue(limit)
  const [trades, setTrades] = useState<sumOfTrade>({})
  
  // list of coins to fetch :
  const currenciesToFetch = ["BTCUSDT",'AVAXUSDT','ETHUSDT','SOLUSDT']
 

  // fetching sum of all latest trades per currency
  useEffect(()=> {
    let tempCurrencies = {}
    let index = 0
    currenciesToFetch.forEach((currency) => {
      getHistoricalSpotCandleStick(currency,'1m', apiLimit,'').then((response)=>{
        let tradeSum=0
        index ++
        response.forEach((entry:any[]) => tradeSum += (entry[8]))
        tempCurrencies = { ...tempCurrencies, [currency] : tradeSum}
        index === currenciesToFetch.length && setTrades(tempCurrencies)
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[apiLimit])

  
const data = {
  labels: Object.keys(trades),
  datasets: [
    {
      label: 'sum of trades',
      data: Object.values(trades),
      backgroundColor: [
        'blue',
        'purple',
        'red',
        'green',

      ],
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)',
      // ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'SUM OF TRADES',
    },
  },
};
  

  return (
    <div className="pie">
      <Pie data={data} options={options} />;
    </div>
  )
}

export default PieGraph
