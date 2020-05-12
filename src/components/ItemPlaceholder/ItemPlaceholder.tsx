import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => {
  return {
    root: {
      position: 'absolute',
      backgroundColor: '#C8C8C8',
      borderRadius: '3px',
    },
  };
});

const ItemPlaceholder = ({ style }: { style: CSSProperties }) => {
  const classes = styles();
  return <div className={classes.root} style={style} />;
};

export default ItemPlaceholder;
