import React from 'react';
import PropTypes from 'prop-types';
import DropdownCategory from '../components/DropdownCategory';
import DropdownDifficulty from '../components/DropdownDifficulty';
import DropdownType from '../components/DropdownType';

const Configuration = ({ history }) => (
  <div>
    <button type="button" onClick={() => history.push('/')}>Voltar</button>
    <DropdownCategory />
    <DropdownDifficulty />
    <DropdownType />
  </div>
);

export default Configuration;

Configuration.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
