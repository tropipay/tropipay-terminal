import Button from "@mui/material/Button";
import React, { useState, useEffect } from 'react';

function Login() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div className="Login">
      <Button variant="contained" onClick={() => setCount(count + 1)}>Hello World</Button>
    </div>
  );
}

export default Login;
