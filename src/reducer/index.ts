import { IState, IActions } from 'interfaces/IData';

export enum Types {
  SET_LANES = 'SET_LANES',
  ADD_LANE = 'ADD_LANE',
  UPDATE_LANE = 'UPDATE_LANE',
  ADD_ITEM = 'ADD_ITEM',
  SET_ITEMS = 'SET_ITEMS',
}

export default function dataReducer(state: IState, action: IActions) {
  switch (action.type) {
    case Types.SET_LANES:
      return { ...state, lanes: action.payload };
    case Types.ADD_LANE:
      return {
        ...state,
        lanes: { ...state.lanes, [action.payload.id]: action.payload },
      };
    case Types.UPDATE_LANE:
      return {
        ...state,
        lanes: { ...state.lanes, [action.payload.id]: action.payload },
      };
    case Types.ADD_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.laneId]: [
            ...(state.items[action.payload.laneId] || []),
            action.payload,
          ],
        },
      };
    case Types.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
