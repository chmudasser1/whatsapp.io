import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './app/store.js';
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './context/Socket.jsx'; // Use capitalized SocketProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </StrictMode>,
);