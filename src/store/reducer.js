import {combineReducers} from 'redux';
import auth from 'src/store/auth';
import games from 'src/store/games';

export default combineReducers({
  auth,
  games,
});
