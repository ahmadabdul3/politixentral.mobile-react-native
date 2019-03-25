
const actions = {};

actions.getPoliticiansSuccess = function(data) {
  return {
    type: 'GET_POLITICIANS_SUCCESS',
    data
  };
};

export { actions };

const initialState = {
  address: '',
  data: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {
        address: action.data.address
      };

    default: return state;
  }
}
