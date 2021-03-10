import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsApi from '../services/getQuestionsApi';
import receiveQuestion from '../actions/ReceiveQuestion';
import receiveError from '../actions/ReceiveError';
import Questions from '../components/Questions';
import Header from '../components/Header';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderQuestions: false };
  }

  componentDidMount() {
    const { sendQuestions, history, sendError } = this.props;
    getQuestionsApi(this.props)
      .then(async ({ response_code: code, results }) => {
        if (code === 3) {
          sendError('Token Expirado');
          localStorage.clear();
          await history.push('/');
        }
        this.setState({ renderQuestions: true });
        return sendQuestions(results);
      });
  }

  render() {
    const { renderQuestions } = this.state;
    return (renderQuestions) ? (
      <div>
        <Header />
        <Questions />
      </div>
    ) : null;
  }
}

const mapStateToProps = ({
  categoryReducer: { categorySelected },
  difficultyReducer: { difficultySelected },
  typeReducer: { typeSelected },
}) => ({
  categorySelected, difficultySelected, typeSelected,
});
const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (results) => dispatch(receiveQuestion(results)),
  sendError: (error) => dispatch(receiveError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  history: PropTypes.instanceOf(Object),
  sendQuestions: PropTypes.func.isRequired,
  sendError: PropTypes.func.isRequired,
};

Game.defaultProps = {
  history: {},
};
