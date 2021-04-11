import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './components/App';
//import movies from './reducers';
import rootReducer from './reducers';



const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log('Action_type: ', action.type);
  next(action);
}

// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//   if(typeof action==='function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export const StoreContext = createContext();

class Provider extends React.Component {
  render() {
    const { store } = this.props;

    return <StoreContext.Provider value={store}>
      {this.props.children}
    </StoreContext.Provider>
  }
}

export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.store.subscribe(() => {
          this.forceUpdate();
          console.log('updated');
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);
        return (
          <Component  {...dataToBePassedAsProps} dispatch={store.dispatch} />
        );
      }
      
    }


    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => <ConnectedComponent store={store} />}
          </StoreContext.Consumer>
        )
      }
    }

  }
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);


