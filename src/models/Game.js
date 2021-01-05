import PropTypes from 'prop-types';
import cards from 'src/cards';
import specialCells from 'src/constants/specialCells';

export default class Game {
  id;
  deck;
  players;
  score;
  cards;
  specialCells;
  association;
  board;
  votes;

  static propTypes = {
    id: PropTypes.string,
    deck: PropTypes.array,
    players: PropTypes.array,
    score: PropTypes.object,
    cards: PropTypes.array,
    specialCells: PropTypes.object,
    association: PropTypes.string,
    board: PropTypes.array,
    votes: PropTypes.object,
  };

  static defaultProps = {
    id: `${Date.now}`,
    deck: cards,
    players: [0, 1, 2],
    score: {0: 0, 1: 0, 2: 0},
    cards: {0: cards, 1: cards, 2: cards},
    specialCells: {10: specialCells.blur, 20: specialCells.blur},
    association: '',
    board: [],
    votes: {},
  };

  constructor(props) {
    this.id = props.id;
    this.deck = props.deck;
    this.players = props.players;
    this.score = props.score;
    this.cards = props.cards;
    this.specialCells = props.specialCells;
    this.association = props.association;
    this.board = props.board;
    this.votes = props.votes;
  }
}
