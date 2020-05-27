import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import { login } from '../../redux/reducers/auth.reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from '../common/FormControls/FormControlsStyles.module.scss';
import { getIsAuth, getCaptchaURL } from '../../redux/reducers/auth.selectors';

const LoginForm = ({ captchaURL, ...props }) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Input}
          validate={[required]}
          type='email'
          name='email'
          placeholder='login' />
      </div>
      <div>
        <Field
          component={Input}
          validate={[required]}
          type='password'
          name='password'
          placeholder='password' />
      </div>
      <div>
        <Field
          component={Input}
          type='checkbox'
          name='rememberMe'
        /> remember me
      </div>
      {props.error && props.error.map(err => (
        <p className={classes.formSummeryError} key={err.toString()}>{err}</p>
      ))}
      {captchaURL && (
        <div>
          <img src={captchaURL} alt='captcha' />
          <Field
            component={Input}
            type='text'
            name='captcha'
            placeholder='Symbols from captcha'
          />
        </div>
      )}
      <button type='submit'>LOGIN</button>
    </form>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
  const onSubmit = ({ email, password, rememberMe, captcha = null }) => {
    props.login(email, password, rememberMe, captcha);
  }

  if (props.isAuth) return <Redirect to='/profile' />
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
    </div>
  )
}

const mapStateToProps = store => ({
    isAuth: getIsAuth(store),
    captchaURL: getCaptchaURL(store),
});

export default connect(mapStateToProps, { login })(Login);