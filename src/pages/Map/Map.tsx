import React from 'react';
import { Maps } from '../../components/Maps/Maps';
import {
  DEFAULT_COORDINATES,
  useCoordinates,
} from '../../hooks/useCoordinates';
import { Button } from '@mui/material';

export const DEFAULT_ZOOM = 11;

export const MapPage: React.FC = () => {
  const { currentCoordinates, startMovingCoordinates, stopMovingCoordinates } =
    useCoordinates();

  return (
    <div>
      <Button onClick={startMovingCoordinates}>Move</Button>
      <Button onClick={stopMovingCoordinates}>Stop</Button>
      <Maps
        coordinates={currentCoordinates}
        defaultCoordinates={DEFAULT_COORDINATES}
        defaultZoom={DEFAULT_ZOOM}
      />
    </div>
  );
};
