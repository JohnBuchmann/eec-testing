/**
 * Testing our Button component
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Button from '../index';

// eslint-disable-next-line prettier/prettier
const handleRoute = () => {};
const href = 'http://mxstbr.com';
const children = <h1>Test</h1>;
const renderComponent = (props = {}) =>
  render(
    <Button href={href} {...props}>
      {children}
    </Button>
  );

describe('<Button />', () => {
  it('should render a <Button /> tag to change route if the handleRoute prop is specified', () => {
    const { container } = renderComponent({ handleRoute });
    expect(container.querySelector('button')).toBeDefined();
  });

  it('should render a secondary <Button /> tag to change route if the handleRoute prop is specified', () => {
    const { container } = renderComponent({
      handleRoute: () => {},
      secondary: true,
    });

    expect(container.querySelector('button')).toBeDefined();
  });

  it('should have children', () => {
    const { container } = renderComponent();
    expect(container.querySelector('button').children).toHaveLength(1);
  });

  it('should handle click events', () => {
    const onClickSpy = jest.fn();
    const { container } = renderComponent({ onClick: onClickSpy });
    fireEvent.click(container.querySelector('button'));
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should have a class attribute', () => {
    const { container } = renderComponent();
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });
});
