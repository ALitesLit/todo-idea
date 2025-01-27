import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import './index.scss';

import { store } from './store/store';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
