import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef(({ text, type, value, isValid, onChange, onBlur }, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  }

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    }
  })

  return (
    <div
      className={`${classes.control} ${isValid === false ? classes.invalid : ''
        }`}
    >
      <label htmlFor={type}>{text}</label>
      <input
        ref={inputRef}
        type={type}
        id={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
});

export default Input;