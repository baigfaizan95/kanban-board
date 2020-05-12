import React, { CSSProperties } from 'react';
import { IItem } from 'interfaces/IItem';
import {
  DraggingStyle,
  NotDraggingStyle,
  Draggable,
} from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import variables from 'styles/variables';

const styles = makeStyles(() => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      backgroundColor: variables.white,
      margin: '5px',
      border: '1px solid lightgray',
    },
  };
});

const Item = (props: IItem & { index: number }) => {
  const classes = styles();
  const getItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle
  ): CSSProperties => ({
    userSelect: 'none',
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={`item-${props.id}`} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(provided.draggableProps.style || {})}
          className={classes.root}
        >
          {props.title}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
