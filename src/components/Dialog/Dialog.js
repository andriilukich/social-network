import React from 'react';
import User from "./User/User";
import Message from "./Message/Message";
import { reduxForm, Field, reset } from 'redux-form';
import { required, maxLength } from '../../utils/validators/validators';
import { Textarea } from '../common/FormControls/FormControls';
import classes from './DialogStyles.module.scss';

const maxLength50 = maxLength(50);

const DialogForm = (props) => {
  return (
    <form className={classes.dialogP__form} onSubmit={props.handleSubmit}>
      <Field
        className={classes.dialogP__textArea}
        component={Textarea}
        validate={[required, maxLength50]}
        placeholder='Your message...'
        name='newMessageBody'
      />
      <button className={classes.dialogP__btn} type='submit'>send</button>
    </form>
  )
}

const DialogReduxForm = reduxForm({ form: 'sendMessageForm' })(DialogForm)

const DialogList = ({ users, messages, sendMsg }) => {

  const onFormSubmit = (formData) => {
    sendMsg(formData.newMessageBody);
    reset('sendMessageForm');
  };

  return (
    <div className={classes.dialogP}>
      <h1 className={classes.dialogP__title}>Dialogs</h1>
      <div className={classes.dialogP__wrapper}>
        <ul className={classes.dialogP__usersList}>
          {users.map(({ name, id, active }) =>
            <User name={name} id={id} active={active} key={id} />
          )}
        </ul>
        <div className={classes.dialogP__messages}>
          <ul className={classes.dialogP__messagesList}>
            {messages.map(({ text, id, src }) =>
              <Message text={text} id={id} src={src} key={id} />
            )}
          </ul>
          <DialogReduxForm onSubmit={onFormSubmit} />
        </div>
      </div>
    </div>
  )
}

export default DialogList;