import { Coords } from 'google-map-react';
import { useCallback, useEffect, useState } from 'react';

export type Props = {
  initialCoordinates?: Coords;
};

export const DEFAULT_COORDINATES: Coords = {
  lat: 40.74869,
  lng: -73.98572,
};

const STEP = 0.000001;
const INTERVAL_DURATION_MS = 10;

export const useCoordinates = (props?: Props) => {
  const [currentCoordinates, setCurrentCoordinates] = useState(
    props?.initialCoordinates ?? DEFAULT_COORDINATES,
  );
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const startMovingCoordinates = useCallback(() => {
    const newIntervalId = setInterval(() => {
      setCurrentCoordinates(({ lat, lng }) => {
        return {
          lat: (lat += STEP),
          lng: (lng += STEP),
        };
      });

      setIntervalId(newIntervalId);
    }, INTERVAL_DURATION_MS);
  }, []);

  const stopMovingCoordinates = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }, [intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return {
    currentCoordinates,
    startMovingCoordinates,
    stopMovingCoordinates,
  };
};
