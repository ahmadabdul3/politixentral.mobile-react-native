import { connect } from 'react-redux';
import RacesPage from 'px/pages/races';
import { actions as globalStateActions } from 'px/redux/global_state';

export function mapStateToProps({ globalState }) {
  return {
    address: globalState.address,
  };
}

export function mapDispatchToProps(dispatch) {
  return {};
  // return {
  //   setAddress: (data) => dispatch(globalStateActions.setAddress(data)),
  // };
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(RacesPage);

export default Container;
