import { atom } from "recoil";
import { BinanceCurrency, DarkMode, Limit, menuItems, Symbol } from '../types';

export const currencies = atom<BinanceCurrency[][]>({
  key: 'binanceCurrency',
  default:[]
})

export const limit = atom<Limit>({
  key: 'apiLimit',
  default: 60
})

export const symbol = atom<Symbol>({
  key: 'apiSymbol',
  default: 'AVAXUSDT'
})

export const darkMode = atom<DarkMode>({
  key: 'darkmode', 
  default: true
})

export const menuItemsVisible = atom<menuItems>({
  key:'menuItems',
  default:{
    pie: true, 
    graph: true
  }
})
