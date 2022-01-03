import { useRef } from 'react'
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
import { datatype } from "faker/locale/zh_TW";

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
  const canvasRef = useRef()

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

  // type dataType = {
  //   labels:[],
  //   datasets: []
  // }

//using canvas.getContext to create a gradient 
const data = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  let gradient
  if (ctx !==null) gradient = ctx.createLinearGradient(0, 0, 0, 200);
  if (gradient ){
    gradient.addColorStop(0, 'rgba(250,174,50,1)');   
    gradient.addColorStop(1, 'rgba(250,174,50,0)');
  }

  const result = {
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
        borderColor: gradient,
        
      },
    ]
  }
  return result
}


  // const data = {
  //   labels: hours,
  //   datasets: [
  //     {
  //       label: 'currency value in $',
  //       data : priceLabel,
  //       tension:0.5,
  //       pointStyle: 'circle',
  //       pointRadius:1,
  //       pointBorderWidth:0,
  //       pointBorderColor:'black',
  //       borderWidth:2,
  //       backgroundColor: 'black',
  //       fill:true,
  //       borderColor: 'red',
        
  //     },
  //   ]
  // };
  return (
    <div className="graph" >  
     <Line options={options} data={data} />
     <Actions />
    </div>
  )
}

export default CurrencyGraph