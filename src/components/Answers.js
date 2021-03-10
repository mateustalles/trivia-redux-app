import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatAnswers from '../actions/GameActions';
import { stopTimer } from '../actions/TimerActions';
import setPoints from '../actions/setPoints';
import './Answers.css';

function switchDifficulty(difficulty) {
  switch (difficulty) {
    case 'hard':
      return 3;
    case 'medium':
      return 2;
    default:
      return 1;
  }
}

function changeDataTest(correctAnswer, index, array) {
  const correctIndex = array.indexOf(correctAnswer);
  if (correctIndex === index) {
    return 'correct-answer';
  }
  return `wrong-answer-${index}`;
}

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = { results: {}, answersArray: ['', '', '', ''] };
    this.getAnswers = this.getAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      question,
      timer,
      wrongAnswerFlag,
      answersClasses,
      toStopTimer,
    } = this.props;

    const {
      answersClasses: prevAnswersClasses,
    } = prevProps;

    if (prevProps.question !== question) {
      this.getAnswers(question);
    }

    if (wrongAnswerFlag === true && timer === 0 && answersClasses === prevAnswersClasses) {
      this.submitAnswer();
      toStopTimer();
    }
  }

  getAnswers(question) {
    const { toFormatAnswers } = this.props;
    const { correct_answer: correct, incorrect_answers: incorrect } = question;
    const auxIncorrect = incorrect.map((inc) => decodeURIComponent(inc));
    const allAnswers = [decodeURIComponent(correct), ...auxIncorrect];
    const filteredAnswers = (allAnswers.length > 2) ? ['', '', '', ''] : ['', ''];
    for (let i = 0; i < filteredAnswers.length; i += 1) {
      const aux = (allAnswers.length > 1) ? Math.round((Math.random() * allAnswers.length)) : 0;
      filteredAnswers.splice(i, 1, allAnswers.splice(aux - 1, 1)[0]);
    }
    this.setState({ results: filteredAnswers, answersArray: ['', '', '', ''] });
    toFormatAnswers(['', '', '', '']);
  }

  submitAnswer(value) {
    const {
      question: { correct_answer: correctAnswer, difficulty },
      toFormatAnswers, timer, points,
    } = this.props;
    const difficultyPoints = switchDifficulty(decodeURIComponent(difficulty));
    if (value === decodeURIComponent(correctAnswer)) {
      points(10 + (difficultyPoints * timer));
    }
    const { results, answersArray } = this.state;
    const index = results.indexOf(decodeURIComponent(correctAnswer));
    const formattedAnswers = {
      ...this.state,
      answersArray: answersArray.map((ele, i) => ((i === index) ? 'green' : 'red')),
    };
    toFormatAnswers(formattedAnswers.answersArray);
  }

  render() {
    const { results } = this.state;
    const {
      question, answersClasses, question: { correct_answer: theCorrectAnswer },
      toStopTimer,
    } = this.props;
    const correctAnswer = question ? decodeURIComponent(theCorrectAnswer) : '';
    return (
      <div>
        {(Object.keys(results).length > 0)
          ? results.map((response, index, array) => (
            <button
              type="button"
              value={response}
              key={response}
              data-testid={changeDataTest(correctAnswer, index, array)}
              className={answersClasses && answersClasses[index]}
              onClick={
                ({ target }) => {
                  this.submitAnswer(target.value);
                  toStopTimer();
                }
              }
              disabled={(answersClasses[0]) ? true : !true}
            >
              {decodeURIComponent(response)}
            </button>
          )) : ''}
      </div>
    );
  }
}

const mapStateToProps = ({
  gameReducer: { answersClasses, wrongAnswerFlag, question },
  timeReducer: { timer },
}) => ({
  timer,
  answersClasses,
  wrongAnswerFlag,
  question,
});

const mapDispatchToProps = (dispatch) => ({
  toFormatAnswers: (answersClasses) => dispatch(formatAnswers(answersClasses)),
  toStopTimer: () => dispatch(stopTimer()),
  points: (param) => dispatch(setPoints(param)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Answers);

Answers.propTypes = {
  question: PropTypes.instanceOf(Object),
  toFormatAnswers: PropTypes.func.isRequired,
  answersClasses: PropTypes.arrayOf(PropTypes.string),
  toStopTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  wrongAnswerFlag: PropTypes.bool,
  points: PropTypes.func.isRequired,
};

Answers.defaultProps = {
  question: {},
  answersClasses: {},
  wrongAnswerFlag: false,
};
