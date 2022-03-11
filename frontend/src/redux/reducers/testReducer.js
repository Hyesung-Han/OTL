const SET_TEST = 'setTest';

const TestInitialState = {
    data: {
        title:"",
        descript:"",
    },
};

export const setTest = data => ({
    type: SET_TEST,
    data,
  });

export const TestReducer = (state = TestInitialState, action) => {
    switch (action.type) {
      case SET_TEST:
        return {
          state,
          data: action.data,
        };
      default:
        return state;
    }
  };