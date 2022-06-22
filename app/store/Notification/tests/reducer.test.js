import { setAllNotification } from '../actions';
import notificationReducer from '../notificationReducer';

const defaultState = {
  notifications: [],
};

describe('Notifications Reducer', () => {
  let undefinedData;
  it('Should returns initial state', () => {
    expect(notificationReducer(undefinedData, {})).toEqual(defaultState);
  });

  describe('Notifications', () => {
    it('Should set notification data when setAllNotification action is dispatched', () => {
      const notificationMock = [
        {
          id: '602403d4973bb702f165485a',
          title: 'Notification Title',
          text:
            'Schneider Electric BB-466-02 Serial Number 3216842FBD-FOO is Offline.',
          siteId: 1,
          ts: '2021-01-10 10:03:24',
        },
        {
          id: '602403d4973bb702f365845a',
          title: 'Notification Title',
          text:
            'Schneider Electric BB-466-02 Serial Number 321648FBD-FOO is Offline.',
          siteId: 9,
          ts: '2021-02-09 10:03:24',
        },
      ];
      const expected = {
        ...defaultState,
        loading: false,
        notifications: notificationMock,
      };
      const actual = notificationReducer(
        defaultState,
        setAllNotification(notificationMock)
      );

      expect(actual).toEqual(expected);
    });
  });
});
