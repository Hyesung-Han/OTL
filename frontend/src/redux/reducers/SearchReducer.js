const SET_INIT = "setInit";
const SET_Value = "setValue";
const SET_CATEGORY = "setCategory";

/**
 * HSH | 2022.03.22 | v1.0
 * @name SearchInitialState
 * @des search값 저장할 포맷
 */
const SearchInitialState = {
  data: {
    searchValue: "",
    category: "",
  },
};

/**
 * HSH | 2022.03.22 | v1.0
 * @name setValue
 * @des search value 저장
 */
export const setValue = (searchValue) => ({
  type: SET_Value,
  searchValue,
});

/**
 * HSH | 2022.03.22 | v1.0
 * @name setCategory
 * @des categori 저장
 */
export const setCategory = (category) => ({
  type: SET_CATEGORY,
  category,
});

/**
 * HSH | 2022.03.22 | v1.0
 * @name setInit
 * @des Search 데이터 초기화
 */
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
