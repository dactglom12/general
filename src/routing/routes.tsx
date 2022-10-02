import React from 'react';
import { mainRoutingConstants } from './constants';
import { HomePage } from '../pages/Home/Home';
import { NotFoundPage } from '../pages/404/404';
import { Route } from 'react-router';
import { ComponentWithChildren } from '../shared/interfaces';

interface IRoute {
  path: string;
  exact?: boolean;
  render?: (props) => JSX.Element;
}

const notFoundRoute: IRoute = {
  path: '*',
  render: (props) => <NotFoundPage {...props} />,
};

const routes: IRoute[] = [
  {
    path: mainRoutingConstants.home(),
    exact: true,
    render: (props) => <HomePage {...props} />,
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
