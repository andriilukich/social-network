import React from 'react';
import classes from './LoaderStyles.module.scss';
import LoaderSVG from '../../../assets/img/loader.svg';

const Loader = () => {
  return (
    <div className={classes.Loader}>
      <img className={classes.Loader__Img} src={LoaderSVG} alt='loader' />
    </div>
  );
}

export default Loader