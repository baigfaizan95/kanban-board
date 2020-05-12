import { ActionMap } from 'utils/actionmap';
import { ILane } from './ILane';
import { IItem } from './IItem';
import { Types } from 'reducer';

type DataPayload = {
  [Types.SET_LANES]: { [key: string]: ILane };
  [Types.ADD_LANE]: { id: string; title: string };
  [Types.UPDATE_LANE]: { id: string; title: string };
  [Types.ADD_ITEM]: { id: string; title: string; laneId: string };
  [Types.SET_ITEMS]: { [key: string]: IItem[] };
};

export type IActions = ActionMap<DataPayload>[keyof ActionMap<DataPayload>];

export interface IState {
  lanes: { [key: string]: ILane };
  items: { [key: string]: IItem[] };
}
