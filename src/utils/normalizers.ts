import { normalize, schema } from 'normalizr';
import { ILane } from 'interfaces/ILane';

export const normalizeLanes = (data: ILane[]) => {
  const lanes = new schema.Entity('lanes', {}, { idAttribute: 'id' });
  const normalizedData = normalize(data, [lanes]);
  return normalizedData.entities.lanes || {};
};
