import { useRef, useEffect, useState } from 'react'
import { useRecoilValue } from "recoil"
import { currencies, symbol, limit } from "../../state/atoms"
import moment from 'moment';
import type { ChartData, ChartArea } from 'chart.js';
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
import { Chart, Line } from 'react-chartjs-2';
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
const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'purple',
];
const CurrencyGraph = () => {
  const chartRef = useRef<ChartJS>(null);

  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  //getting graph numeric infos from the Recoil store
  const apiSymbol = useRecoilValue(symbol)
  const currencyInfos = useRecoilValue(currencies)

  //getting graph limit to udpate render
  const apiLimit = useRecoilValue(limit)

  // computing price array for the Y axis
  const prices = currencyInfos.map((item) => item[4])
  const priceLabel = prices.map(price => Number(price))

  // computing hours array for the X axis
  const time = currencyInfos.map((item) => item[6])
  let hours = time.map(time => moment.unix(Number(time)/1000).format("hh A"))
 
  // not displaying the grid by default
  // ChartJS.defaults.scale.grid.display = false;

  // function to create gradient
  function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
    const colorStart = 'red';
    // const colorStart = faker.random.arrayElement(colors);
    const colorMid = 'orange'
    const colorEnd = 'blue'
  
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);
  
    return gradient;
  }

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
      },
    ]
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  },[apiSymbol, currencyInfos])

  return (
    <div className="graph" >  
    <Chart ref={chartRef} type='line' options={options} data={chartData} />
     {/* <Line options={options} data={data} /> */}
     <Actions />
    </div>
  )
}

export default CurrencyGraph