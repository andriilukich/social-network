import React from 'react';
import Post from './Post/Post';
import classes from './PostsListStyles.module.scss';
import { reduxForm, Field, reset } from 'redux-form';
import { Textarea } from '../../common/FormControls/FormControls';
import { required, maxLength } from '../../../utils/validators/validators';

const maxLength50 = maxLength(50);

const PostForm = (props) => {
  return (
    <form className={classes.posts__postForm} onSubmit={props.handleSubmit}>
      <Field
        className={classes.posts__textArea}
        component={Textarea}
        validators={[required, maxLength50]}
        name='newPostBody'
        placeholder='Your new post...'
        rows='5'
      />
      <button className={classes.posts__btn} type='submit'>send</button>
    </form>
  )
}

const PostReduxForm = reduxForm({ form: 'sendPostForm' })(PostForm);

const PostsList = ({ posts, sendPost, profile }) => {

  const onFormSubmit = (formData) => {
    sendPost(formData.newPostBody);
    reset('sendPostForm');
  };

  return (
    <article className={classes.posts}>
      <h2>My Posts</h2>
      <ul>
        {posts.length > 0 && posts.map(item =>
          <Post key={item.id} {...item} userPhoto={profile.photos.small} />
        )}
      </ul>
      <PostReduxForm onSubmit={onFormSubmit} />
    </article>
  );
};

export default PostsList;

