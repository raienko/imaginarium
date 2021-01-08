import {combineReducers} from 'redux';
import auth from 'src/store/auth';
import game from 'src/store/game';

export default combineReducers({
  auth,
  game,
});
