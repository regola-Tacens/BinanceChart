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

export async function getCurrentAveragePrice ( symbol: String) {
  const baseUrl = 'https://api.binance.com/'
  const endpoint = '/api/v3/avgPrice'

  try {
    const response = await axios.get(`${baseUrl}${endpoint}?symbol=${symbol}`)
    return Promise.resolve(response.data)
  } catch (err) {
  return Promise.reject(err)
  }
}

export async function getSymbolsInformations (){
  const baseUrl = 'https://api.binance.com/'
  const endpoint = '/api/v3/exchangeInfo'

  try {
    const response = await axios.get(`${baseUrl}${endpoint}`)
    return Promise.resolve(response.data)
  } catch (err) {
    return Promise.reject(err)
  }
}