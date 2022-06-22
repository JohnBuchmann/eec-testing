import { getModifiedFieldsFormat } from '../busband';

describe('BusBand functions', () => {
  const mockExpected = {
    testData: {
      value: 1,
    },
  };

  const workingInputMockData = [mockExpected];
  const originalInputMockData = [
    {
      testData: {
        value: 2,
      },
    },
  ];
  it('should get from getModifiedFieldsFormat a format array', () => {
    const expected = { points: [mockExpected.testData] };
    const columnNameIdMock = 'testData';
    const actual = getModifiedFieldsFormat(
      originalInputMockData,
      workingInputMockData,
      columnNameIdMock
    );
    expect(actual).toEqual(expected);
  });

  it('should get from getModifiedFieldsFormat undefined object when there is not columnNameId', () => {
    const expected = false;
    let columnNameIdMock;
    const actual = !!getModifiedFieldsFormat(
      originalInputMockData,
      workingInputMockData,
      columnNameIdMock
    );
    expect(actual).toEqual(expected);
  });
});
