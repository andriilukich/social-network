import React from 'react';
import UserStatus from './UserStatus';
import renderer from 'react-test-renderer';

describe('ProfileStatus component', () => {
  test('status from state should be in the state', () => {
    const component = renderer.create(<UserStatus status='Hello world :)' />);
    const instance = component.getInstance();
    // expect(instansce.state.status).toBe('Hello world :)');
  });
});