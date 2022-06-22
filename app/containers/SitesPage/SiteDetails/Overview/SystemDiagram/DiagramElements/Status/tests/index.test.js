import React from 'react';
import { shallow } from 'enzyme';
import Status from '..';

describe('<StatusIcon/>', () => {
  it('Should display alarm status  when alarm status id is sent', () => {
    const props = {
      x: 100,
      y: 100,
      width: '32px',
      height: '32px',
      roundness: '14px',
      statusId: 3,
    };

    const expected = 1;
    const component = shallow(<Status {...props} />);
    const actual = component.find('SvgAlarm').length;

    expect(actual).toBe(expected);
  });

  it('Should display Faulted status  when faulted status id is sent', () => {
    const props = {
      x: 100,
      y: 100,
      width: '32px',
      height: '32px',
      roundness: '14px',
      statusId: 2,
    };

    const expected = 1;
    const component = shallow(<Status {...props} />);
    const actual = component.find('SvgFaulted').length;

    expect(actual).toBe(expected);
  });

  it('Should display Maintenance status  when maintenance status id is sent', () => {
    const props = {
      x: 100,
      y: 100,
      width: '32px',
      height: '32px',
      roundness: '14px',
      statusId: 1,
    };

    const expected = 1;
    const component = shallow(<Status {...props} />);
    const actual = component.find('SvgMaintenance').length;

    expect(actual).toBe(expected);
  });

  it('Should display Ok status  when Ok status id is sent', () => {
    const props = {
      x: 100,
      y: 100,
      width: '32px',
      height: '32px',
      roundness: '14px',
      statusId: 5,
    };

    const expected = 1;
    const component = shallow(<Status {...props} />);
    const actual = component.find('SvgOk').length;

    expect(actual).toBe(expected);
  });

  it('Should display Warning status  when warning status id is sent', () => {
    const props = {
      x: 100,
      y: 100,
      width: '32px',
      height: '32px',
      roundness: '14px',
      statusId: 4,
    };

    const expected = 1;
    const component = shallow(<Status {...props} />);
    const actual = component.find('SvgWarning').length;

    expect(actual).toBe(expected);
  });

  it('Should not display status when invalid status id is sent', () => {
    const props = {
      x: 100,
      y: 100,
      width: '32px',
      height: '32px',
      roundness: '14px',
    };

    const expected = 0;
    const component = shallow(<Status {...props} />);
    const actual = component.find('svg').children().length;

    expect(actual).toBe(expected);
  });

  it('Should display status on position zero X and Y when no locations are sent', () => {
    const props = {
      width: '32px',
      height: '32px',
      roundness: '14px',
    };

    const expectedPositionX = 0;
    const expectedPositionY = 0;
    const component = shallow(<Status {...props} />);
    const { x: actualPositionX, y: actualPositionY } = component
      .find('svg')
      .first()
      .props();

    expect(actualPositionX).toBe(expectedPositionX);
    expect(actualPositionY).toBe(expectedPositionY);
  });

  it('Should status size equal to zero when no size is sent', () => {
    const props = {
      roundness: '14px',
    };

    const expectedWidth = '';
    const expectedHeight = '';
    const component = shallow(<Status {...props} />);
    const { width: actualWidth, height: actualHeight } = component
      .find('svg')
      .first()
      .props();

    expect(actualWidth).toBe(expectedWidth);
    expect(actualHeight).toBe(expectedHeight);
  });

  it('Should status roundness equal to none when no roundness is sent', () => {
    const props = {
      x: 100,
      y: 100,
      width: '32px',
      height: '32px',
    };

    const expectedRoundness = '';
    const component = shallow(<Status {...props} />);
    const { rx: actualRoundness } = component
      .find('rect')
      .first()
      .props();

    expect(actualRoundness).toBe(expectedRoundness);
  });
});
