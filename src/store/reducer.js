import {combineReducers} from 'redux';
import auth from 'src/store/auth';
import multiplayer from 'src/store/multiplayer';
import singleplayer from 'src/store/singleplayer';
import settings from 'src/store/settings';

export default combineReducers({
  auth,
  singleplayer,
  multiplayer,
  settings,
});
