import axios from "axios";

export async function getHistoricalSpotCandleStick(
  symbol:string,
  interval:string,
  limit:number,
  startTime:string,
) {
  const baseUrl = 'https://api.binance.com/'
  const endPoint = 'api/v1/klines'
  const parameters =
    startTime !== ''
      ? `?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}&startTime=${startTime}`
      : `?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${limit}`
  try {
    const response = await axios.get(`${baseUrl}${endPoint}${parameters}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}