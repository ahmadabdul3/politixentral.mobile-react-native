import { connect } from 'react-redux';
import SettingsPage from 'px/pages/settings';
import { actions as globalStateActions } from 'px/redux/global_state';

export function mapStateToProps({ globalState }) {
  return {
    address: globalState.address,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    setAddress: (data) => dispatch(globalStateActions.setAddress(data)),
  };
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

export default Container;
