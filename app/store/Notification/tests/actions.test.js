import { setAllNotification, removeNotifications } from '../actions';
import { SET_NOTIFICATION } from '../types';

describe('Notifications Actions', () => {
  it('should create an action to set notifications', () => {
    const expected = {
      type: SET_NOTIFICATION,
      payload: [],
    };
    const actual = setAllNotification([]);

    expect(actual).toEqual(expected);
  });
});
describe('helper functions', () => {
  it('should remove notifications from the array using removeNotifications', () => {
    const mockNotificationsIds = ['1', '5'];
    const mockNotifications = [{ id: '1' }, { id: '2' }, { id: '5' }];
    const actual = removeNotifications(mockNotificationsIds, mockNotifications);
    const expected = [{ id: '2' }];
    expect(actual).toEqual(expected);
  });
});
