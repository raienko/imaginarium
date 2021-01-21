import {combineReducers} from 'redux';
import auth from 'src/store/auth';
import games from 'src/store/games';
import system from 'src/store/system';

export default combineReducers({
  auth,
  games,
  system,
});
