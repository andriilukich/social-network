import { v4 as uuidv4 } from 'uuid';

const SEND_MESSAGE = 'social-network/dialog/SEND_MESSAGE';

const initialState = {
  users: [
    { name: 'Andrii', id: 1, active: true },
    { name: 'Alex', id: 2 },
    { name: 'Ira', id: 3 },
    { name: 'Vova', id: 4 },
    { name: 'Anton', id: 5 },
  ],
  messages: [
    { text: 'Hi, what\'s up?', id: 1, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' },
    { text: 'I\'m always good, and you?', id: 2, src: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' },
    { text: 'Fine, thanks. Where are you going?', id: 3, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' },
    { text: 'To the cinema, do you wanna go with me?', id: 4, src: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' },
    { text: 'Yey, let\'s go.', id: 5, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' },
  ],
};


const dialogPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: 
      const newMessage = {
        text: action.newMessageBody,
        id: uuidv4(),
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    default:
      return state;
  }
};

export const sendMsg = (newMessageBody) =>
  ({ type: SEND_MESSAGE, newMessageBody });

export default dialogPageReducer;

