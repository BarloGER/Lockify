import { initializeApp } from './frameworks/react/App';

const initializeClient = async (): Promise<void> => {
  try {
    initializeApp();
  } catch (error) {
    console.error('Failed to initialize the client app:', error);
    process.exit(1);
  }
};

initializeClient();
