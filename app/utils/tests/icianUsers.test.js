/**
 * Test for date helper
 */
import { getIcianUsersDropDown, AllIcianUsers } from '../icianUsers';

const allUsers = {
  value: AllIcianUsers,
  text: AllIcianUsers,
};

describe('ICIAN Usert helper', () => {
  describe('#getIcianUsersDropDown', () => {
    it('should return an array with the list of users', () => {
      const icianUsers = [
        {
          externalId: 'externalIdTest',
          userName: 'User Name Test',
        },
      ];

      const expected = [
        allUsers,
        {
          value: 'externalIdTest',
          text: 'User Name Test',
        },
      ];
      const result = getIcianUsersDropDown(icianUsers);
      expect(result).toEqual(expected);
    });

    it('should return an array with only allUser', () => {
      const expected = [allUsers];
      const result = getIcianUsersDropDown();
      expect(result).toEqual(expected);
    });
  });
});
