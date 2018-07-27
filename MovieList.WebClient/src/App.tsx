import * as React from 'react';
import { Store } from 'redux';
import './App.css';
import AppContainer from "./container/AppContainer";
import { configureStore } from './store/createStore';

const initialState = window.__INITIAL_STATE__;
const store: Store<any> = configureStore(initialState);

class App extends React.Component<{}, {}> {
  public render() {
      return (
          <AppContainer store={store}/>
    );
  }
}

export default App;