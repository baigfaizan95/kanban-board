import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import variables from 'styles/variables';
import Dragger from 'components/Dragger';

const styles = makeStyles(() => {
  return {
    root: {
      display: 'inline-block',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      flex: '1',
      height: '100%',
      width: '280px',
      margin: '0 4px',
      borderRadius: '6px',
      '&:first-child': {
        marginLeft: '8px',
      },
      '&:last-child': {
        marginRight: '8px',
      },
      background: variables.darkGrey,
    },
  };
});

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  ...draggableStyle,
});

const Lanes = ({ index }: { index: number }) => {
  const classes = styles();
  return (
    <Dragger draggableId={`wrapper-item-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.root}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        />
      )}
    </Dragger>
  );
};

export default Lanes;
