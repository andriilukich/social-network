import React from 'react';
import classes from './FormControlsStyles.module.scss';

const FormControl = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
      <div>
        {children}
      </div>
      {hasError && <span>{error}</span>}
    </div>
  )
}
export const Textarea = (props) => {
  const { input, meta, ...restProps } = props;
  return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input = (props) => {
  const { input, meta, ...restProps } = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}