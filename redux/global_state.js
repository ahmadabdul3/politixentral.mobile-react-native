
const actions = {};

actions.setAddress = function(data) {
  return {
    type: 'SET_ADDRESS',
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
