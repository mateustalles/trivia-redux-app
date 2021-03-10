import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MD5 from 'crypto-js/md5';
import { wrongAnswer } from '../actions/ChangeScoreboard';
import { resetTimer } from '../actions/TimerActions';
import Answers from './Answers';
import Timer from './Timer';
import answers from '../actions/answersAction';


function fetchLadder(rankingFromLocalStorage, newRankingItem) {
  if (rankingFromLocalStorage === null) {
    return [
      newRankingItem,
    ];
  }
  return [
    ...rankingFromLocalStorage,
    newRankingItem,
  ];
}

function saveScore(name, assertions, score, gravatarEmail) {
  const rankingFromLocalStorage = localStorage.getItem('ranking') !== null ? JSON.parse(localStorage.getItem('ranking')) : null;
  const obj = {
    player: {
      name, assertions, score, gravatarEmail,
    },
  };
  localStorage.setItem('state', JSON.stringify(obj));
  const imageUrl = `https://www.gravatar.com/avatar/${MD5(gravatarEmail)}`;
  const newRankingItem = { name, score, imageUrl };
  const newRanking = fetchLadder(rankingFromLocalStorage, newRankingItem);
  const sortedLadder = [...newRanking].sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(sortedLadder));
}

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidUpdate() {
    const { timer, wrongAnswerSelected } = this.props;
    return timer === 0 && wrongAnswerSelected();
  }

  nextQuestion() {
    const { resetTimerNow } = this.props;
    this.setState((state) => ({ questionNumber: state.questionNumber + 1 }));
    resetTimerNow();
  }

  renderButton(name, assertions, score, gravatarEmail) {
    const { questionNumber } = this.state;
    if (questionNumber < 4) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={this.nextQuestion}
        >
          PRÓXIMA
        </button>
      );
    }
    return (
      <Link to="/feedback">
        <button
          data-testid="btn-next"
          onClick={() => saveScore(name, assertions, score, gravatarEmail)}
          type="button"
        >
          FINALIZAR
        </button>
      </Link>
    );
  }

  render() {
    const {
      results, timer, name, assertions, score, gravatarEmail, stopTimer, objectToAnswers,
    } = this.props;
    const { questionNumber } = this.state;
    const currentQuestion = results.map(({ question }) => decodeURIComponent(question));
    const currentCategory = results.map(({ category }) => decodeURIComponent(category));
    objectToAnswers(results[questionNumber]);
    return (
      <div>
        {timer === 0 && <div>RESPOSTA ERRADA</div>}
        <div>
          <p data-testid="question-category">{currentCategory[questionNumber]}</p>
          <h3 data-testid="question-text">{currentQuestion[questionNumber]}</h3>
        </div>
        <div>
          <Timer />
        </div>
        <div>
          <Answers />
        </div>
        <div>
          {
            stopTimer
              ? this.renderButton(name, assertions, score, gravatarEmail)
              : false
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  wrongAnswerSelected: () => dispatch(wrongAnswer()),
  resetTimerNow: () => dispatch(resetTimer()),
  objectToAnswers: (ele) => dispatch(answers(ele)),
});

const mapStateToProps = ({
  getQuestions: { results },
  timeReducer: { timer, stopTimer },
  gameReducer: {
    name, assertions, score, gravatarEmail,
  },
}) => ({
  results, timer, name, assertions, score, gravatarEmail, stopTimer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  name: PropTypes.string,
  assertions: PropTypes.number,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
  resetTimerNow: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  timer: PropTypes.number.isRequired,
  wrongAnswerSelected: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool,
  objectToAnswers: PropTypes.func.isRequired,
};

Questions.defaultProps = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  stopTimer: false,
};
