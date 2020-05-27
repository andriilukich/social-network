import profilePageReducer, { sendPost, deletePost } from "./profilePage.reducer";

const state = {
  posts: [
    { text: 'Hi', id: 1 },
    { text: 'Hello', id: 2 },
    { text: 'You', id: 3 },
    { text: 'Hey', id: 4 },
  ]
};

it('after adding a post, length of it\'s array should increment', () => {
  const action = sendPost('What\'s up?');

  const newState = profilePageReducer(state, action);

  expect(newState.posts.length).toBe(5);
});
it('after adding a post, text of the post should be correct', () => {
  const action = sendPost('What\'s up?');

  const newState = profilePageReducer(state, action);

  expect(newState.posts[4].text).toBe('What\'s up?');
});

it('after deleting a post, length of it\'s array should decrement', () => {
  const action = deletePost(2);

  const newState = profilePageReducer(state, action);

  expect(newState.posts.length).toBe(3);
});