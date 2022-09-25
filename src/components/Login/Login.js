import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

const Login = (props) => {
  const ctx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer((state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.includes('@') }
    }

    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.includes('@') }
    }

    return { value: '', isValid: false };
  }, { value: '', isValid: null });

  const [passwordState, dispatchPassword] = useReducer((state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.trim().length > 6 }
    }

    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.trim().length > 6 }
    }

    return { value: '', isValid: false };
  }, { value: '', isValid: null });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking validity');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEAN UP');
      clearTimeout(identifier);
    }
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          text="E-Mail"
          type="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
          isValid={emailIsValid}
        />
        <Input
          ref={passwordInputRef}
          text="Password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          value={passwordState.value}
          isValid={passwordIsValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
