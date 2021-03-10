import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCategory from '../services/getCategory';
import requestCategory from '../actions/RequestCategory';
import changeCategory from '../actions/ChangeCategory';

class DropdownCategory extends React.Component {
  componentDidMount() {
    const { saveCategory } = this.props;
    getCategory()
      .then(({ trivia_categories: category }) => saveCategory(category));
  }

  render() {
    const { category, saveChange, categorySelected } = this.props;
    return (
      <div>
        <h4>Categoria:</h4>
        <select
          data-testid="question-category-dropdown"
          value={categorySelected.id}
          onChange={({ target }) => saveChange(target.value)}
        >
          <option value="">Random</option>
          {category.map(({ name, id }) => (<option value={id} key={name}>{name}</option>))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ categoryReducer: { category, categorySelected } }) => (
  { category, categorySelected });

const mapDispatchToProps = (dispatch) => ({
  saveCategory: (results) => dispatch(requestCategory(results)),
  saveChange: (change) => dispatch(changeCategory(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownCategory);

DropdownCategory.propTypes = {
  saveCategory: PropTypes.func.isRequired,
  category: PropTypes.instanceOf(Array),
  saveChange: PropTypes.func.isRequired,
  categorySelected: PropTypes.instanceOf(Object),
};

DropdownCategory.defaultProps = {
  category: [],
  categorySelected: {},
};
