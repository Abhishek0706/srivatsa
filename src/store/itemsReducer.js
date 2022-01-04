import {ADD, DELETESELECTED, SETSELECTED, SELECTALL} from './itemsAction';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {id: state.length + 1, title: action.payload.title, selected: false},
      ];

    case SETSELECTED: {
      const updatedState = [...state];
      for (var i = 0; i < updatedState.length; i++) {
        if (updatedState[i].id === action.payload.id)
          updatedState[i].selected = !updatedState[i].selected;
      }
      return updatedState;
    }

    case DELETESELECTED: {
      let updatedState = [];
      for (var i = 0; i < state.length; i++) {
        if (!state[i].selected) updatedState = [...updatedState, state[i]];
      }
      return updatedState;
    }

    case SELECTALL: {
      const updatedState = [...state];
      for (var i = 0; i < updatedState.length; i++) {
        updatedState[i].selected = true;
      }
      return updatedState;
    }

    default:
      return state;
  }
};
