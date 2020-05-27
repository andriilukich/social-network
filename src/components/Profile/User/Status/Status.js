import React, { useState, useEffect } from 'react';
import classes from './StatusStyles.module.scss';

const UserStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const handelChangeInput = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = (e) => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  return (
    <div className={classes.Status}>
      {editMode ?
        <input
          className={classes.Status__input}
          type='text'
          name='status'
          value={status}
          onBlur={deactivateEditMode}
          autoFocus={true}
          onChange={handelChangeInput}
        /> :
        <h2
          onClick={activateEditMode}
          className={classes.Status__title}
        >
          {status}
        </h2>
      }
    </div>
  );
}

export default UserStatus;