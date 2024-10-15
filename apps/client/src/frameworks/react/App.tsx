import * as ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { ReactNode } from 'react';

// Defines the app and renders it
export const App = () => {
  return (
    <StrictMode>
      <h1>Hello World!</h1>
    </StrictMode>
  );
};

// Starts the app and renders it in the DOM
export const startApp = (Component: ReactNode): void => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(Component);
};

export const initializeApp = () => {
  startApp(<App />);
};
