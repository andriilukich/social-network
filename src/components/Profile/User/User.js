import React, { useState } from 'react';
import Loader from '../../common/Loader/Loader';
import classes from './UserStyles.module.scss';
import placeholderAvatar from '../../../assets/img/user-avatar.png';
import Info from './Info/Info';
import InfoForm from './InfoForm/InfoForm';
import Status from './Status/Status';

const User = (props) => {
  const [editMode, setEditMode] = useState(false);
  const onPhotoSelected = (e) => {
    const loadedFile = e.target.files;
    loadedFile.length &&
      props.updatePhoto(loadedFile[0]);
  };

  const onSubmit = (formData) => {
    props.updateProfileInfo(formData).then(
      () => setEditMode(false)
    );
  };

  if (!props.profile) return <Loader />
  return (
    <section className={classes.userI}>
      <h1 className={classes.userI__name}> {props.profile.fullName}</h1>
      <section>
        <img
          className={classes.userI__avatar}
          src={props.profile.photos.large || placeholderAvatar}
          alt='user-avatar'
        />
        {props.isOwner && <input type='file' onChange={onPhotoSelected} />}
      </section>
      <Status status={props.status} updateUserStatus={props.updateUserStatus} />
      {editMode ?
        <InfoForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> :
        <Info {...props} editModeHandle={() => setEditMode(true)} />
      }
    </section>
  );
};

export default User;

