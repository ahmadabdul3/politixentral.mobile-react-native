import { connect } from 'react-redux';
import SendMessageForm from 'px/components/send_message_form';
import { actions as messageActions } from 'px/redux/messages';

export function mapStateToProps({ messages }) {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    getMessagesSuccess: (data) => dispatch(messageActions.getMessagesSuccess(data)),
  };
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMessageForm);

export default Container;
