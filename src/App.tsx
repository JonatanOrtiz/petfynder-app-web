import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Petfynder from './Petfynder'

function App() {
  return (
    < Provider store={store}>
      <Petfynder />
    </Provider >
  );
}

export default App;
