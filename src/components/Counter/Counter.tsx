import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { testIds } from './constants';

export type Props = {
  initialCount?: number;
};

export const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount ?? 0);

  const increment = () => setCount((c) => ++c);
  const decrement = () => setCount((c) => --c);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button data-testid={testIds.increment} onClick={increment}>
        +
      </Button>
      <Typography data-testid={testIds.counter}>{count}</Typography>
      <Button data-testid={testIds.decrement} onClick={decrement}>
        -
      </Button>
    </Box>
  );
};
