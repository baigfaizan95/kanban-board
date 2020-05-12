import { ActionMap } from 'utils/actionmap';
import { ILane } from './ILane';
import { IItem } from './IItem';
import { Types } from 'reducer';

type IPlaceholder = {
  clientHeight: number;
  clientWidth: number;
  clientX: number;
  clientY: number;
  type: string;
};

type DataPayload = {
  [Types.SET_LANES]: { [key: string]: ILane };
  [Types.ADD_LANE]: { id: string; title: string };
  [Types.UPDATE_LANE]: { id: string; title: string };
  [Types.ADD_ITEM]: { id: string; title: string; laneId: string };
  [Types.SET_ITEMS]: { [key: string]: IItem[] };
  [Types.SET_PLACEHOLDER]: IPlaceholder;
  [Types.UPDATE_LANE_ITEMS]: { laneId: string; data: IItem[] };
};

export type IActions = ActionMap<DataPayload>[keyof ActionMap<DataPayload>];

export interface IState {
  placeholder: Partial<IPlaceholder>;
  lanes: { [key: string]: ILane };
  items: { [key: string]: IItem[] };
}
