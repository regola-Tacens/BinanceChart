import { atom } from "recoil";
import { TodoItem } from "./types";
import { Covid } from '../types';

export const todoListState = atom<TodoItem[]>({
  key: 'todoListState',
  default: [
    {id: 0, text: 'c\'est moi', isComplete: true},
    {id: 1, text: 'c\'est lui', isComplete: true},
  ],
});

export const casesOfCovids = atom<Covid[]>({
  key: 'covidState',
  default: []
})