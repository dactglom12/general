import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getArticles } from '../../store/articles/actions';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [queryString, setQueryString] = useState('');

  const onButtonClick = useCallback(() => {
    dispatch(getArticles({ queryString }));
  }, [dispatch, queryString]);

  return (
    <>
      <div>Home Page</div>
      <input
        value={queryString}
        onChange={(e) => setQueryString(e.target.value)}
      />
      <button onClick={onButtonClick}>Send Request</button>
    </>
  );
};
