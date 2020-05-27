import React from 'react';
import classes from './InfoStyles.module.scss';

const Info = ({ profile, ...props }) => {
  return (
    <section className={classes.userI__data}>
      <p className={classes.userI__aboutMe}>{profile.aboutMe}</p>
      <h3 className={classes.userI__job}>
        Работа:
      {profile.lookingForAJob ? ' в поисках' : ' работаю'}
      </h3>
      <p className={classes.userI__job_desc}>
        {profile.lookingForAJob && profile.lookingForAJobDescription}
      </p>
      <h3>Contacts: </h3>
      <ul className={classes.userI__contacts}>
        {profile && Object.keys(profile.contacts).map(contact => {
          return <Contact key={contact.toString()} contTitle={contact} contValue={profile.contacts[contact]} />
        })}
      </ul>
      {props.isOwner && <button onClick={props.editModeHandle}>Update</button>}
    </section>
  )
}

const Contact = ({ contTitle, contValue }) => {
  if (contValue)
    return (
      <li className={classes.userI__contact}>
        <a href={contValue} target="_blank" rel="noopener noreferrer">{contTitle}</a>
      </li>
    )
  return null;
}

export default Info;