import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mainRoutingConstants } from '../../routing/constants';

const REDIRECT_TIMEOUT_DURATION_MS = 5000;

export const NotFoundPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      history.push(mainRoutingConstants.home());
    }, REDIRECT_TIMEOUT_DURATION_MS);

    return () => clearTimeout(timeoutId);
  }, [history]);

  return <div>The page is not found...</div>;
};
