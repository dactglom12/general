import React, { useCallback } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from './routing/routes';
import { store } from './store/store';
import { DragDropContext } from 'react-beautiful-dnd';
import { Header } from './components/Header/Header';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';
import './ADA/problemSolvingPatterns/index';
import { ComponentWithChildren } from './shared/interfaces';

const Wrapper: ComponentWithChildren = ({ children }) => (
  <div style={{ margin: '88px 24px 0 24px' }}>{children}</div>
);

export const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StoreProvider store={store}>
        <BrowserRouter>
          <Header title={'Dactglom Playground'} />
          <Switch>{renderRoutes(Wrapper)}</Switch>
        </BrowserRouter>
      </StoreProvider>
    </LocalizationProvider>
  );
};
