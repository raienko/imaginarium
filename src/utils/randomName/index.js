import {getRandom} from 'src/utils/helpers';
import firstNames from './firstNames.json';
import lastNames from './lastNames.json';

export default function randomName() {
  const firstName = getRandom(firstNames);
  const lastName = getRandom(lastNames);
  return `${firstName} ${lastName}`;
}
