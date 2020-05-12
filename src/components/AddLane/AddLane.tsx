import React from 'react';

import { MdAdd } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';
import LineInput from 'components/LineInput';
import useData from 'hooks/withData';
import { nanoid } from 'nanoid';
import { Types } from 'reducer';

const styles = makeStyles(() => {
  return {
    root: {
      display: 'inline-block',
      width: '280px',
      margin: '0 8px 0 4px',
      cursor: 'pointer',
      fontSize: '18px',
      borderRadius: '3px',
      backgroundColor: '#CEC7C1',
      padding: '8px',
      verticalAlign: 'top',
      border: '1px solid gray',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      '& .MuiInput-underline:after, .MuiInput-underline:before, .MuiInput-underline:hover': {
        borderBottomColor: 'white !important',
      },
      '& .MuiInputBase-input': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
      },
    },
  };
});

const AddLane = () => {
  const classes = styles();
  const { dispatch } = useData();
  const createLane = (title: string) => {
    dispatch({ type: Types.ADD_LANE, payload: { title, id: nanoid() } });
  };
  return (
    <div className={classes.root}>
      <LineInput
        readonly={true}
        placeholder='Name'
        onSubmit={createLane}
        title='Add another lane'
        icon={<MdAdd size={20} />}
      />
    </div>
  );
};

export default AddLane;
