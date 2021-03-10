const INITIAL_STATE = {
  category: [],
  categorySelected: { id: '' },
};
const RESET_FILTER = 'RESET_FILTER';
const GET_CATEGORY = 'GET_CATEGORY';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export default function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return { ...state, category: action.results };
    case CHANGE_CATEGORY:
      return {
        ...state,
        categorySelected: state.category.find(({ id }) => Number(id) === Number(action.change)),
      };
    case RESET_FILTER:
      return INITIAL_STATE;
    default: return state;
  }
}
