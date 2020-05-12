import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import {
  DragStart,
  DropResult,
  DragUpdate,
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';
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

function App() {
  const classes = styles();

  const {
    state: { lanes, placeholder, items },
    dispatch,
  } = useData();

  const handleDragStart = (event: DragStart) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    if (event.type === 'laneWrapper') {
      const { clientHeight, clientWidth } = draggedDOM;
      const sourceIndex = event.source.index;

      dispatch({
        type: Types.SET_PLACEHOLDER,
        payload: {
          clientY: 0,
          clientHeight,
          clientWidth,
          clientX: 8 + sourceIndex * 8 + sourceIndex * 280,
          type: 'laneWrapper',
        },
      });
    }
  };

  const handleDragEnd = (result: DropResult) => {
    dispatch({ type: Types.SET_PLACEHOLDER, payload: {} });
    if (!result.destination) {
      return;
    }
    if (result.type === 'laneWrapper') {
      const items = reOrder(
        Object.values(lanes),
        result.source.index,
        result.destination.index
      );

      const normalizedData = normalizeLanes(items);

      dispatch({ type: Types.SET_LANES, payload: normalizedData });
    } else if (result.type === 'lane') {
      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;
      const sourceSubItems = items[sourceParentId];
      const destSubItems = items[destParentId] || [];
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;
      if (sourceParentId === destParentId) {
        const data = reOrder(sourceSubItems, sourceIndex, destIndex);
        dispatch({
          type: Types.UPDATE_LANE_ITEMS,
          payload: { laneId: sourceParentId, data },
        });
      } else {
        const [draggedItem] = sourceSubItems.splice(sourceIndex, 1);
        dispatch({
          type: Types.UPDATE_LANE_ITEMS,
          payload: { laneId: sourceParentId, data: sourceSubItems },
        });
        draggedItem.laneId = destParentId;
        destSubItems.splice(destIndex, 0, draggedItem);
        dispatch({
          type: Types.UPDATE_LANE_ITEMS,
          payload: { laneId: destParentId, data: destSubItems },
        });
      }
    }
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
    const sourceIndex = event.source.index;

    if (event.type === 'laneWrapper') {
      dispatch({
        type: Types.SET_PLACEHOLDER,
        payload: {
          type: 'laneWrapper',
          clientY: 0,
          clientHeight,
          clientWidth,
          clientX: 8 + destinationIndex * 8 + destinationIndex * 280,
        },
      });
    } else if (event.type === 'lane') {
      const childrenArray = [...draggedDOM.parentNode!.children];
      const movedItem = childrenArray[sourceIndex];
      childrenArray.splice(sourceIndex, 1);

      const updatedArray = [
        ...childrenArray.slice(0, destinationIndex),
        movedItem,
        ...childrenArray.slice(destinationIndex + 1),
      ];

      const clientY =
        49 +
        updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
          const style = window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          const marginTop = parseFloat(style.marginTop);
          return total + curr.clientHeight + marginBottom + marginTop;
        }, 0);

      dispatch({
        type: Types.SET_PLACEHOLDER,
        payload: {
          type: 'lane',
          clientHeight,
          clientWidth,
          clientX: 6,
          clientY,
        },
      });
    }
  };

  return (
    <div className={classes.root}>
      <DragDropContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
      >
        <Droppable
          direction='horizontal'
          droppableId='wrapper'
          type='laneWrapper'
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classes.wrapper}
            >
              {Object.keys(lanes).map((key, i) => (
                <LaneWrapper id={key} index={i} key={key} />
              ))}
              {provided.placeholder}
              {!!Object.keys(placeholder).length &&
                placeholder.type === 'laneWrapper' &&
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
              <AddLane />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
