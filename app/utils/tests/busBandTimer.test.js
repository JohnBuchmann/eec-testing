import busBandTimer from '../busBandTimer';

describe('BusBand functions', () => {
  it('should create a timer', () => {
    const expected = true;
    const actual = busBandTimer.createTimer();
    expect(actual).toEqual(expected);
  });

  it('should destroy a timer', () => {
    const expected = false;
    busBandTimer.createTimer();
    const actual = busBandTimer.clearTimer();
    expect(actual).toEqual(expected);
  });

  it('should not create more than one timer', () => {
    const expected = false;
    busBandTimer.createTimer();
    const actual = busBandTimer.createTimer();
    expect(actual).toEqual(expected);
  });
});
