import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import {Provider} from "react-redux"
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <AppProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AppProvider>
  </Provider>
);


