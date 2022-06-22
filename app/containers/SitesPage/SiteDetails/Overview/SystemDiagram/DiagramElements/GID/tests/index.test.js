import React from 'react';
import { shallow } from 'enzyme';
import GID from '..';

describe('GID', () => {
  it('should render a connected GID with default props', () => {
    const actual = shallow(<GID />);

    expect(actual).toMatchSnapshot();
  });

  it('should render a connected GID when isConnected param is true', () => {
    const mockPositionX = 100;
    const mockPositionY = 100;
    const isConnected = true;

    const actual = shallow(
      <GID x={mockPositionX} y={mockPositionY} isConnected={isConnected} />
    );

    expect(actual).toMatchSnapshot();
  });

  it('should render a connected GID when isConnected param is false', () => {
    const mockPositionX = 100;
    const mockPositionY = 100;
    const isConnected = false;

    const actual = shallow(
      <GID x={mockPositionX} y={mockPositionY} isConnected={isConnected} />
    );

    expect(actual).toMatchSnapshot();
  });

  it('should render a connected GID when isConnected param is not send', () => {
    const mockPositionX = 100;
    const mockPositionY = 100;

    const actual = shallow(<GID x={mockPositionX} y={mockPositionY} />);

    expect(actual).toMatchSnapshot();
  });
});
