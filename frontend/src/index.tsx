import React from 'react';
import {Provider} from "react-redux"
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import App from './App';
import theme from "./theme";
import {store} from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);