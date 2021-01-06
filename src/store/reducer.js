import {combineReducers} from 'redux';
import auth from 'src/store/auth';
import game from 'src/store/game';
import settings from 'src/store/settings';

export default combineReducers({
  auth,
  game,
  settings,
});
