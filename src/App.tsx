import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import Dropper from 'components/Dropper';
import { DragStart, DropResult, DragUpdate } from 'react-beautiful-dnd';
import LaneWrapper from 'components/LaneWrapper';
import getDraggedDom from 'utils/getDraggedDom';
import useData from 'hooks/withData';
import ItemPlaceholder from 'components/ItemPlaceholder';
import variables from 'styles/variables';
import AddLane from 'components/AddLane';
import reOrder from 'utils/reOrder';
import { normalizeLanes } from 'utils/normalizers';
import { Types } from 'reducer';

const styles = makeStyles(() => {
  return {
    root: {
      position: 'relative',
      height: '100%',
    },
    wrapper: {
      overflowX: 'auto',
      overflowY: 'hidden',
      position: 'absolute',
      margin: '10px 0',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      whiteSpace: 'nowrap',
    },
    addItem: {
      display: 'inline-block',
      width: '280px',
      margin: '0 8px 0 4px',
      cursor: 'pointer',
      fontSize: '18px',
      borderRadius: '3px',
      backgroundColor: 'gray',
      padding: '8px',
      color: variables.white,
    },
  };
});

interface IPlaceholder {
  clientHeight: number;
  clientWidth: number;
  clientX: number;
}

function App() {
  const classes = styles();
  const [placeholderProps, setPlaceholderProps] = useState<
    Partial<IPlaceholder>
  >({});

  const { state, dispatch } = useData();

  const handleDragStart = (event: DragStart) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientX: 8 + sourceIndex * 8 + sourceIndex * 280,
    });
  };

  const handleDragEnd = (result: DropResult) => {
    setPlaceholderProps({});
    if (!result.destination) {
      return;
    }

    const items = reOrder(
      Object.values(state.lanes),
      result.source.index,
      result.destination.index
    );

    const normalizedData = normalizeLanes(items);

    dispatch({ type: Types.SET_LANES, payload: normalizedData.entities.lanes });
  };

  const handleDragUpdate = (event: DragUpdate) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientX: 8 + destinationIndex * 8 + destinationIndex * 280,
    });
  };

  return (
    <div className={classes.root}>
      <Dropper
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
        direction='horizontal'
        droppableId='wrapper'
      >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.wrapper}
          >
            {Object.keys(state.lanes).map((key, i) => (
              <LaneWrapper id={key} index={i} key={key} />
            ))}
            {provided.placeholder}
            {!!Object.keys(placeholderProps).length && snapshot.isDraggingOver && (
              <ItemPlaceholder
                style={{
                  top: 0,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth,
                }}
              />
            )}
            <AddLane />
          </div>
        )}
      </Dropper>
    </div>
  );
}

export default App;
