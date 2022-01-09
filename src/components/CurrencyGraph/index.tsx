import { useRef, useEffect, useState } from 'react'
import { useRecoilValue } from "recoil"
import { currencies, symbol } from "../../state/atoms"
import moment from 'moment';
import type { ChartData, ChartArea } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Actions from "../Actions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register (
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Tooltip,
  Title,
  Tooltip,
  Legend,
)


const CurrencyGraph = () => {
  const chartRef = useRef<ChartJS>(null);

  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  //getting graph numeric infos from the Recoil store
  const apiSymbol = useRecoilValue(symbol)
  const currencyInfos = useRecoilValue(currencies)

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
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    responsive: true,
    stacked: false,
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

  // const plugins = [
  //    {
  //     afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any; }) => {
  //       // eslint-disable-next-line no-underscore-dangle
  //       if (chart.tooltip._active && chart.tooltip._active.length) {
  //         // find coordinates of tooltip
  //         const activePoint = chart.tooltip._active[0];
  //         const { ctx } = chart;
  //         const { x } = activePoint.element;
  //         const topY = chart.scales.y.top;
  //         const bottomY = chart.scales.y.bottom;

  //         // draw vertical line
  //         ctx.save();
  //         ctx.beginPath();
  //         ctx.moveTo(x, topY);
  //         ctx.lineTo(x, bottomY);
  //         ctx.lineWidth = 1;
  //         ctx.strokeStyle = '#1C2128';
  //         ctx.stroke();
  //         ctx.restore();
  //       }
  //     },
  //   },
  // ];

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
        // pointBorderColor:'red',
        borderWidth:2,
        backgroundColor: 'purple',
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[apiSymbol, currencyInfos])

  return (
    <div className="graph" >  
    <Chart ref={chartRef} type='line' options={options} data={chartData} />
     <Actions />
    </div>
  )
}

export default CurrencyGraph