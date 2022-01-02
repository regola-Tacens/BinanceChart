import { atom } from "recoil";
import { BinanceCurrency, Limit, Symbol } from '../types';

export const currencies = atom<BinanceCurrency[][]>({
  key: 'binanceCurrency',
  default:[]
})

export const limit = atom<Limit>({
  key: 'apiLimit',
  default: 300
})
export const symbol = atom<Symbol>({
  key: 'apiSymbol',
  default: 'AVAXUSDT'
})
