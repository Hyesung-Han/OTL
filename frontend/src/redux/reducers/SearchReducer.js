const SET_INIT = 'setInit';
const SET_Value = 'setValue';
const SET_CATEGORY = 'setCategory';

const SearchInitialState = {
  data: {
    searchValue: '',
    category: '',
  },
};
export const setValue = searchValue => ({
  type: SET_Value,
  searchValue,
});

export const setCategory = category => ({
  type: SET_CATEGORY,
  category,
});

export const setInit = () => ({
  type: SET_INIT,
});

export const SearchReducer = (state = SearchInitialState, action) => {
  switch (action.type) {
    case SET_INIT:
        return {
          state,
          user: SearchInitialState.data,
        };
    case SET_Value:
        state.data.searchValue = action.searchValue;
        return { ...state };
    case SET_CATEGORY:
        state.data.category = action.category;
        return { ...state };
    default:
      return state;
  }
};
