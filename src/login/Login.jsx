import Button from "@mui/material/Button";
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increment, selectCount } from './LoginSlice';

function Login() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className="Login">
      <Button variant="contained" onClick={() => dispatch(increment())} >Hello World</Button>
    </div>
  );
}

export default Login;
