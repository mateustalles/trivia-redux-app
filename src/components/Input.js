import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import sendName from '../actions/SendName';
import sendEmail from '../actions/SendEmail';

const InputInitial = ({
  nameToReducer, emailToReducer, error, name,
}) => (
  <div>
    <label htmlFor="input-email" data-testid="label-gravatar-email">Email do gravatar:</label>
    <input
      type="email"
      id="input-email"
      data-testid="input-gravatar-email"
      onChange={({ target }) => emailToReducer(target.value)}
    />
    <label htmlFor="input-name" data-testid="label-player-name">Nome do Jogador:</label>
    <input
      type="text"
      id="input-Name"
      data-testid="input-player-name"
      value={(error === 'Error') ? 'Token Expirado' : name}
      onChange={({ target }) => nameToReducer(target.value)}
    />
  </div>
);

const mapStateToProps = ({ getQuestions: { error }, gameReducer: { name } }) => ({ error, name });

const mapDispatchToProps = (dispatch) => ({
  nameToReducer: (name) => dispatch(sendName(name)),
  emailToReducer: (email) => dispatch(sendEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputInitial);

InputInitial.propTypes = {
  nameToReducer: PropTypes.func,
  emailToReducer: PropTypes.func,
}.isRequired;
