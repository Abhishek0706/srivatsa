export const ADD = 'ADD';
export const SETSELECTED = 'SETSELECTED';
export const DELETESELECTED = 'DELETESELECTED';
export const SELECTALL = 'SELECTALL';

export const add = title => {
  return {type: ADD, payload: {title}};
};

export const setSelected = id => {
  return {type: SETSELECTED, payload: {id}};
};

export const deleteSelected = () => {
  return {type: DELETESELECTED};
};

export const selectAll = () => {
  return {type: SELECTALL};
};
