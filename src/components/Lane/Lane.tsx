import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MdAdd } from 'react-icons/md';
import LineInput from 'components/LineInput';
import useData from 'hooks/withData';
import Dropper from 'components/Dropper';
import Item from 'components/Item';
import { IItem } from 'interfaces/IItem';
import { nanoid } from 'nanoid';
import { Types } from 'reducer';

const styles = makeStyles(() => {
  return {
    root: {
      height: '100%',
      borderRadius: '3px',
      background: '#F4F5F7',
      border: '1px solid gray',
    },
    title: {
      cursor: 'pointer',
      fontSize: '20px',
      padding: '8px',
      fontWeight: 'bold',
      display: 'flex',
      '& > div': {
        flex: '1',
      },
    },
    footer: {
      display: 'flex',
      padding: '8px',
      alignItems: 'center',
      cursor: 'pointer',
    },
  };
});

const Lane = ({ id }: { id: string }) => {
  const {
    state: { lanes, items },
    dispatch,
  } = useData();

  const classes = styles();

  const lane = useMemo(() => {
    return lanes[id];
  }, [lanes[id]]);

  const laneItems = useMemo(() => {
    return items[lane.id] || [];
  }, [items[lane.id]]);

  const onTitleChange = (title: string) => {
    const data = { ...lane, title };
    dispatch({ type: Types.UPDATE_LANE, payload: data });
  };

  const onCardAdd = (title: string) => {
    const data: IItem = { laneId: lane.id, title, id: nanoid() };
    dispatch({ type: Types.ADD_ITEM, payload: data });
  };

  return (
    <Dropper onDragEnd={() => {}} droppableId='lane'>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={classes.root}
        >
          <div className={classes.title}>
            <LineInput onSubmit={onTitleChange} title={lane.title} />
          </div>
          {laneItems.map((item, i) => (
            <Item index={i} key={item.id} {...item} />
          ))}
          <div className={classes.footer}>
            <LineInput
              onSubmit={onCardAdd}
              title='Add another card'
              icon={<MdAdd size={18} />}
              readonly={true}
            />
          </div>
        </div>
      )}
    </Dropper>
  );
};

export default Lane;
