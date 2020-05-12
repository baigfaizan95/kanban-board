import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/* Components */
import Lanes from 'components/Lanes';
import Dropper from 'components/Dropper';

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
  };
});

function App() {
  const classes = styles();

  const onDragEnd = () => {};
  return (
    <div className={classes.root}>
      <Dropper
        onDragEnd={onDragEnd}
        direction='horizontal'
        droppableId='wrapper'
      >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.wrapper}
          >
            {Array(10)
              .fill(0)
              .map((lane, i) => (
                <Lanes index={i} key={i} />
              ))}
          </div>
        )}
      </Dropper>
    </div>
  );
}

export default App;
