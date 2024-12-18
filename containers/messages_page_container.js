import { connect } from 'react-redux';
import MessagesPage from 'px/pages/messages/messages';
import { actions as messageActions } from 'px/redux/messages';

export function mapStateToProps({ messages }) {
  return {
    messages: messages.data,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getMessagesSuccess: (data) => dispatch(messageActions.getMessagesSuccess(data)),
  };
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesPage);

export default Container;
