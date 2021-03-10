import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenRequest from '../services/tokenRequest';

class PlayGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.onPlayClick = this.onPlayClick.bind(this);
  }

  onPlayClick(name, gravatarEmail) {
    localStorage.setItem('state', JSON.stringify({ player: { name, gravatarEmail } }));
    tokenRequest()
      .then(async (param) => {
        const aux = (typeof param === 'object') ? param.token : param;
        localStorage.setItem('token', (aux));
        await this.setState({ redirect: true });
      });
  }

  render() {
    const { name, gravatarEmail } = this.props;
    const { redirect } = this.state;
    return (redirect) ? <Redirect to="/game" /> : (
      <button
        type="button"
        onClick={() => this.onPlayClick(name, gravatarEmail)}
        data-testid="btn-play"
        disabled={(name !== '' && gravatarEmail !== '') ? false : !false}
      >
        Jogar!
      </button>
    );
  }
}

const mapStateToProps = ({ gameReducer: { name, gravatarEmail } }) => ({ name, gravatarEmail });

export default connect(mapStateToProps)(PlayGameButton);

PlayGameButton.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
};

PlayGameButton.defaultProps = {
  name: '',
  gravatarEmail: '',
};
