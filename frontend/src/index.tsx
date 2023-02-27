import React from 'react';
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import {PersistGate} from "redux-persist/integration/react";
import App from './App';
import theme from "./theme";
import {persistor, store} from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);