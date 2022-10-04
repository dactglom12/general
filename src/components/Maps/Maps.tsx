import React from 'react';
import { ComponentWithChildren } from '../../shared/interfaces';
import GoogleMapReact, { Coords } from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTruck} from "@fortawesome/free-solid-svg-icons";

export type Props = {
  coordinates: Coords;
  defaultZoom: number;
  defaultCoordinates: Coords;
};


const Marker = (props: any) => <FontAwesomeIcon icon={faTruck} />;

export const Maps: ComponentWithChildren<Props> = ({
  coordinates,
  defaultZoom,
  defaultCoordinates,
  children,
}) => {
  return (
    <div style={{ height: '500px', width: '500px' }}>
      <GoogleMapReact
        defaultCenter={defaultCoordinates}
        defaultZoom={defaultZoom}
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY }}
      >
        <Marker
          text="Text marker"
          lat={coordinates.lat}
          lng={coordinates.lng}
        />
        {children}
      </GoogleMapReact>
    </div>
  );
};
