import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import changeType from '../actions/ChangeType';

const DropdownType = ({ types, typeSelected, saveChange }) => (
  <div>
    <h4>Tipo:</h4>
    <select
      data-testid="question-type-dropdown"
      value={typeSelected}
      onChange={({ target }) => saveChange(target.value)}
    >
      <option value="">Random</option>
      {types.map((type) => (<option value={type} key={type}>{type}</option>))}
    </select>
  </div>
);

const mapStateToProps = ({ typeReducer: { types, typeSelected } }) => (
  { types, typeSelected }
);

const mapDispatchToProps = (dispatch) => ({
  saveChange: (change) => dispatch(changeType(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownType);

DropdownType.propTypes = {
  saveChange: PropTypes.func.isRequired,
  typeSelected: PropTypes.string,
  types: PropTypes.instanceOf(Array).isRequired,
};

DropdownType.defaultProps = {
  typeSelected: '',
};
