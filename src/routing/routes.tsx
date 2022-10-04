import React from 'react';
import { mainRoutingConstants } from './constants';
import { HomePage } from '../pages/Home/Home';
import { Redirect, Route } from 'react-router';
import { ComponentWithChildren } from '../shared/interfaces';
import { MapPage } from '../pages/Map/Map';

interface IRoute {
  path: string;
  exact?: boolean;
  render?: (props) => JSX.Element;
}

const notFoundRoute: IRoute = {
  path: '*',
  render: () => <Redirect to={mainRoutingConstants.home()} />,
};

const routes: IRoute[] = [
  {
    path: mainRoutingConstants.home(),
    exact: true,
    render: (props) => <HomePage {...props} />,
  },
  {
    path: mainRoutingConstants.maps(),
    exact: true,
    render: (props) => <MapPage {...props} />,
  },
  notFoundRoute,
];

export const renderRoutes = (Wrapper: ComponentWithChildren) =>
  routes.map((route, index) => (
    <Route
      {...route}
      render={(props) => {
        return <Wrapper>{route.render(props)}</Wrapper>;
      }}
      key={index}
    />
  ));
