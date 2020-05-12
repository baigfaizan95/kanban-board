import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Dragger from 'components/Dragger';
import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import Lane from 'components/Lane';

const styles = makeStyles(() => {
  return {
    root: {
      display: 'inline-block',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      flex: '1',
      maxHeight: '100%',
      width: '280px',
      margin: '0 4px',
      '&:first-child': {
        marginLeft: '8px',
      },
    },
  };
});

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle
): CSSProperties => ({
  userSelect: 'none',
  ...draggableStyle,
});

const LaneWrapper = ({ index, id }: { id: string; index: number }) => {
  const classes = styles();
  return (
    <Dragger draggableId={`wrapper-item-${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.root}
          style={getItemStyle(provided.draggableProps.style || {})}
        >
          <Lane id={id} />
        </div>
      )}
    </Dragger>
  );
};

export default LaneWrapper;
