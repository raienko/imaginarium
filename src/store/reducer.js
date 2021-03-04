import {combineReducers} from 'redux';
import auth from 'src/modules/auth/reducer';
import games from 'src/modules/games/reducer';
import system from 'src/modules/system/reducer';
import user from 'src/modules/user/reducer';

export default combineReducers({
  auth,
  games,
  system,
  user,
});
