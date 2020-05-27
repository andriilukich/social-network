import React from 'react';
import classes from './InfoFormStyles.module.scss';
import { reduxForm, Field } from 'redux-form';
import { Input, Textarea } from '../../../common/FormControls/FormControls';
import { required, maxLength } from '../../../../utils/validators/validators';

const maxLength30 = maxLength(30);
const maxLength150 = maxLength(150);
const maxLength50 = maxLength(50);
const normalizeBoolean = value => {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return value;
};

const InfoForm = (props) => {
  const { handleSubmit, pristine, submitting, reset } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label>Full name:
        <Field
          name='fullName'
          component={Input}
          type='text'
          require={[required, maxLength30]}
        />
      </label>
      <label>About me:
        <Field
          name='aboutMe'
          component={Textarea}
          type='text'
          require={[required, maxLength150]}
          placeholder="About me..."
        />
      </label>
      <label>Are you looking for a job?</label>
      <div>
        <label>
          <Field
            name='lookingForAJob'
            component='input'
            type='radio'
            value={true}
            normalize={normalizeBoolean}
          />
        yes
        </label>
        <label>
          <Field
            name='lookingForAJob'
            component='input'
            type='radio'
            value={false}
            normalize={normalizeBoolean}
          />
        no
        </label>
      </div>
      <label>
        Your job description.
        <Field
          name='lookingForAJobDescription'
          component={Input}
          type='text'
          require={[required, maxLength50]}
          placeholder={`I'm looking for...`}
        />
      </label>
      {Object.keys(props.profile.contacts).map(contact => {
        return (
          <label key={contact.toString()}>
            {contact}
            <Field
              name={`contacts.${contact}`}
              component={Input}
              type="url"
              placeholder={contact}
            />
          </label>
        )
      })}
      {props.error && props.error.map(err => {
        return (
          <p className={classes.formSummeryError}>{err}</p>
        )
      })}
      <button type='submit' disabled={submitting}>Save</button>
      <button type='button' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
    </form>
  )
};

const InfoReduxForm = reduxForm({ form: 'infoUpdate' })(InfoForm)

export default InfoReduxForm;