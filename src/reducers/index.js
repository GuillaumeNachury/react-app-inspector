import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import appContent from './AppContent';

const appReducers = combineReducers({
  appContent,
  routerReducer
});

export default appReducers