/**
 * HSH/LDJ | 2022.03.24 | v1.0
 * @name SearchReducers
 * @api -
 * @des Search관련 정보를 Store에 저장해서 사용하기 위한 코드 [매번 불러오기 비효율적이니까!]
 */

const SET_SEARCHINIT = "setSearchinit";
const SET_VALUE = "setValue";
const SET_CATEGORY = "setCategory";

const SearchInitialState = {
  data: {
    searchValue: "",
    category: "",
  },
};

export const setValue = (searchValue) => ({
  type: SET_VALUE,
  searchValue,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  category,
});

export const setSearchinit = () => ({
  type: SET_SEARCHINIT,
});

export const SearchReducer = (state = SearchInitialState, action) => {
  switch (action.type) {
    case SET_SEARCHINIT:
      return {
        state,
        data: SearchInitialState.data,
      };

    case SET_VALUE:
      state.data.searchValue = action.searchValue;
      return { ...state };

    case SET_CATEGORY:
      state.data.category = action.category;
      return { ...state };

    default:
      return state;
  }
};
