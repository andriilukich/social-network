import { connect } from 'react-redux';
import { compose } from 'redux';
import { reset } from 'redux-form';
import { sendMsg } from '../../redux/reducers/dialog.reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getMessages, getContacts } from '../../redux/reducers/dialog.selectors';
import DialogPage from './Dialog';

const mapStateToProps = (state) => ({
  messages: getMessages(state),
  users: getContacts(state),
});

export default compose(
  connect(mapStateToProps, { sendMsg, reset }),
  withAuthRedirect
)(DialogPage);