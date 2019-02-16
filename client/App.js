import React from 'react';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "remote-redux-devtools";
import { reducer } from "./src/redux";
import { watcherSaga } from "./src/sagas";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';
import Aircraft from './src/screens/Aircraft';
import NearbyAircraft from './src/screens/NearbyAircraft';


const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watcherSaga);

const RootStack = createStackNavigator(
  {
    Home: {
       screen: setupReduxContainer(Home),
       navigationOptions: { title: 'The plane explainer' }
    },
    Aircraft: {
      screen: setupReduxContainer(Aircraft),
      navigationOptions: { title: 'Aircraft details' }
    },
    NearbyAircraft: {
      screen: setupReduxContainer(NearbyAircraft),
      navigationOptions: { title: 'Nearby aircraft' }
    },
  }, {
    initialRouteName: 'Home',
  }
);

export const NavigationContainer = createAppContainer(RootStack);

export function setupReduxContainer(component) {
  const Container = component;
  return connect(
    state => ({ ...state })
  )(props => <Container {...props} />);
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
     )
   }
};
