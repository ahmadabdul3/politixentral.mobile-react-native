import { combineReducers } from 'redux';
import globalState from './global_state';
import messages from './messages';

const reducer = combineReducers({
  globalState,
  messages,
});

export default reducer;
