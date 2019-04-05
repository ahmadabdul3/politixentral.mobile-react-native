
const actions = {};

actions.getMessagesSuccess = (data) => {
  return {
    type: 'GET_MESSAGES_SUCCESS',
    data
  };
};

actions.createMessageSuccess = (data) => {
  return {
    type: 'CREATE_MESSAGE_SUCCESS',
    data
  };
};

export { actions };

const initialState = {
  data: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_MESSAGES_SUCCESS':
      return {
        data: [ ...action.data ],
      };

    case 'CREATE_MESSAGE_SUCCESS':
      return {
        data: [ action.data, ...state.data ],
      };

    default: return state;
  }
}
