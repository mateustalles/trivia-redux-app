import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decreaseTimer } from '../actions/TimerActions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimer: '',
    };
    this.timerOn = this.timerOn.bind(this);
  }

  componentDidMount() {
    this.timerOn();
  }

  componentDidUpdate(prevProps) {
    const { stopTimer } = this.props;
    const { stopTimer: prevStopTimer } = prevProps;
    const { setTimer } = this.state;
    if (stopTimer === true) {
      clearInterval(setTimer);
    }

    if (prevStopTimer === true) {
      clearInterval(setTimer);
      this.timerOn();
    }
  }

  timerOn() {
    const { startTimer } = this.props;
    this.setState({ setTimer: setInterval(() => startTimer(), 1000) });
  }

  render() {
    const { timer } = this.props;
    return (
      <div data-testid="timer">
        {`Tempo: ${timer}`}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(decreaseTimer()),
});

const mapStateToProps = ({
  timeReducer: { timer, stopTimer },
}) => ({
  timer, stopTimer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  stopTimer: PropTypes.bool,
  timer: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  stopTimer: false,
};
