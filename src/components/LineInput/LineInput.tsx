import React, { useState, useRef, ReactNode } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = makeStyles(() => {
  return {
    input: {
      width: '100%',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
    },
  };
});

const LineInput = (props: {
  title: string;
  label?: string;
  readonly?: boolean;
  onSubmit(value: string): void;
  icon?: ReactNode;
  placeholder?: string;
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.readonly ? '' : props.title);
  const ref = useRef<HTMLDivElement>(null);
  const classes = styles();
  const toggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(true);
  };

  const outsideClick = () => {
    setEdit(false);
    if (props.readonly) {
      setValue('');
    }
  };

  useOutsideClick(ref, outsideClick);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(value);
    setEdit(false);
  };

  return (
    <div style={{ width: '100%' }} ref={ref} onClick={toggle}>
      {edit ? (
        <form onSubmit={submit}>
          <TextField
            classes={{ root: classes.input }}
            onChange={(e) => setValue(e.target.value)}
            label={props.label}
            value={value}
            placeholder={props.placeholder}
          />
        </form>
      ) : (
        <p className={classes.wrapper}>
          {props.icon} {props.readonly ? props.title : value}
        </p>
      )}
    </div>
  );
};

export default LineInput;
