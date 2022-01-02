import { useRecoilValue } from "recoil"
import { currencies } from "../../state/atoms"

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
  const currencyInfos = useRecoilValue(currencies)
  const prices = currencyInfos.map((item) => item[4])
  const priceLabel = prices.map(price => Number(price))
  const time = currencyInfos.map((item) => item[6])

  let labels = time.map((t) => (Number(t)/100000000).toFixed(0).toString())
  ChartJS.defaults.scale.grid.display = false;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'bitcoin',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Binance currency',
        data : priceLabel,
        // tension:0.5,
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