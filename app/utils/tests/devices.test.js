import { allLocationsDefault, getAllLocations } from 'Utils/devices';

const allLocationItem = {
  value: allLocationsDefault,
  text: allLocationsDefault,
};
describe('Devices Helper', () => {
  describe('#getAllLocations', () => {
    it('should return all available locations', () => {
      const mockDevicesLocations = [
        {
          lcmLocation: 1,
        },
        {
          lcmLocation: 2,
        },
      ];

      const containerName = 'Container';
      const actual = getAllLocations(mockDevicesLocations, containerName);
      const expected = [
        allLocationItem,
        {
          value: 1,
          text: `${containerName} 1`,
        },
        {
          value: 2,
          text: `${containerName} 2`,
        },
      ];
      expect(actual).toStrictEqual(expected);
    });

    it('should return only All Location Default when no input', () => {
      const actual = getAllLocations();
      const expected = [allLocationItem];
      expect(actual).toStrictEqual(expected);
    });
  });
});
