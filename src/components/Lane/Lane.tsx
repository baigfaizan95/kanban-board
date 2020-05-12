import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MdAdd } from 'react-icons/md';
import LineInput from 'components/LineInput';
import useData from 'hooks/withData';
import Item from 'components/Item';
import { IItem } from 'interfaces/IItem';
import { nanoid } from 'nanoid';
import { Types } from 'reducer';
import {
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';
import ItemPlaceholder from 'components/ItemPlaceholder';

const styles = makeStyles(() => {
  return {
    root: {
      height: '100%',
      borderRadius: '3px',
      background: '#F4F5F7',
      border: '1px solid gray',
      position: 'relative',
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

const Lane = ({
  id,
  parentDragHandle,
}: {
  id: string;
  parentDragHandle: DraggableProvidedDragHandleProps | undefined;
}) => {
  const {
    state: { lanes, items, placeholder },
    dispatch,
  } = useData();

  const classes = styles();

  const lane = useMemo(() => {
    return lanes[id];
  }, [lanes, id]);

  const laneItems = useMemo(() => {
    return items[lane.id] || [];
  }, [items, lane]);

  const onTitleChange = (title: string) => {
    const data = { ...lane, title };
    dispatch({ type: Types.UPDATE_LANE, payload: data });
  };

  const onCardAdd = (title: string) => {
    const data: IItem = { laneId: lane.id, title, id: nanoid() };
    dispatch({ type: Types.ADD_ITEM, payload: data });
  };

  return (
    <Droppable droppableId={lane.id} type='lane'>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={classes.root}
        >
          <div {...parentDragHandle} className={classes.title}>
            <LineInput onSubmit={onTitleChange} title={lane.title} />
          </div>

          {laneItems.map((item, i) => (
            <Item index={i} key={item.id} {...item} />
          ))}
          {provided.placeholder}
          {!!Object.keys(placeholder).length &&
            placeholder.type === 'lane' &&
            snapshot.isDraggingOver && (
              <ItemPlaceholder
                style={{
                  top: placeholder.clientY,
                  left: placeholder.clientX,
                  height: placeholder.clientHeight,
                  width: placeholder.clientWidth,
                }}
              />
            )}
          <div className={classes.footer}>
            <LineInput
              onSubmit={onCardAdd}
              title='Add another card'
              icon={<MdAdd size={18} />}
              readonly={true}
              placeholder='Card Name'
            />
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Lane;
