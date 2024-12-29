import React, { useState } from 'react';

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleChildClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Count: {count}</p>
      <Button onClick={handleChildClick} />
    </div>
  );
};
const Button = ({ onClick }) => {
    return (
      <button onClick={onClick}>Click Me</button>
    );
  };