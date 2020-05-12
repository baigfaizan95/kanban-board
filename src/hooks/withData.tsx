import React, {
  createContext,
  useContext,
  useReducer,
  Reducer,
  Dispatch,
  useLayoutEffect,
  useEffect,
  useState,
} from 'react';
import storage from 'utils/storage';
import { IActions, IState } from 'interfaces/IData';
import { nanoid } from 'nanoid';
import { normalizeLanes } from 'utils/normalizers';
import groupBy from 'utils/groupBy';
import dataReducer, { Types } from 'reducer';

const initialState: IState = {
  lanes: {},
  items: {},
  placeholder: {},
};

const DataContext = createContext<{
  state: IState;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<IState, IActions>>(
    dataReducer,
    initialState
  );

  useEffect(() => {
    storage.set('lanes', Object.values(state.lanes));
  }, [state.lanes]);

  useEffect(() => {
    storage.set('items', Object.values(state.items).flat());
  });

  useLayoutEffect(() => {
    const lanes = storage.get('lanes');
    const items = storage.get('items');
    if (lanes) {
      const normalizedData = normalizeLanes(lanes);
      dispatch({
        type: Types.SET_LANES,
        payload: normalizedData,
      });
    } else {
      const data = [{ title: 'First Lane', id: nanoid() }];
      const normalizedData = normalizeLanes(data);
      dispatch({
        type: Types.SET_LANES,
        payload: normalizedData,
      });
    }
    if (items) {
      const data = groupBy(items, 'laneId');
      dispatch({
        type: Types.SET_ITEMS,
        payload: data,
      });
    }
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export default useData;
