import { useRecoilValue } from "recoil"
import { currencies, symbol } from "../../state/atoms"
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Actions from "../Actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CurrencyGraph = () => {
  const apiSymbol = useRecoilValue(symbol)
  const currencyInfos = useRecoilValue(currencies)

  // computing price array for the Y axis
  const prices = currencyInfos.map((item) => item[4])
  const priceLabel = prices.map(price => Number(price))

  // computing hours array for the X axis
  const time = currencyInfos.map((item) => item[6])
  let hours = time.map(time => moment.unix(Number(time)/1000).format("hh A"))
 
  ChartJS.defaults.scale.grid.display = false;

  const options = {
    responsive: true,
    scales: {
        y: {
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value:any, index:any, values:any) {
                    return '$' + value;
                }
            }
        }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: apiSymbol,
      },
    },
  };

  const data = {
    labels: hours,
    datasets: [
      {
        label: 'currency value in $',
        data : priceLabel,
        tension:0.5,
        pointStyle: 'circle',
        pointRadius:1,
        pointBorderWidth:0,
        pointBorderColor:'black',
        borderWidth:2,
        backgroundColor: 'black',
        fill:true,
        borderColor: 'red'
      },
    ]
  };
  return (
    <div className="graph">
     <Line options={options} data={data} />
     <Actions />
    </div>
  )
}

export default CurrencyGraph