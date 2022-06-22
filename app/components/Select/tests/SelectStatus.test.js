/**
 * Testing our Select component
 */

import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render } from 'react-testing-library';
import SelectStatus from '../SelectStatus';

// const renderer = new ShallowRenderer();
const testUsers = [
  {
    text: 'Unassigned',
    icon: `https://api.adorable.io/avatars/200/${Math.random()}.png`,
    value: 0,
  },
  {
    text: 'John Doe',
    icon: `https://api.adorable.io/avatars/200/${Math.random()}.png`,
    value: 1,
  },
  {
    text: 'Jane Doe',
    icon: `https://api.adorable.io/avatars/200/${Math.random()}.png`,
    value: 2,
  },
];

const renderComponent = (props = {}) =>
  render(<SelectStatus selectData={testUsers} {...props} />);

describe('<SelectStatus />', () => {
  it('should render a <SelectStatus> tag with default data', () => {
    const onChangeSpy = jest.fn();
    const { container } = render(<SelectStatus onChange={onChangeSpy} />);

    expect(container.querySelector('button')).toBeDefined();
  });

  it('should render a <SelectStatus> tag', () => {
    const onChangekSpy = jest.fn();
    const { container } = renderComponent({
      onChange: onChangekSpy,
    });

    expect(container.querySelector('button')).toBeDefined();
  });

  it('should handle change when option is clicked', () => {
    const onChangekSpy = jest.fn();
    const { container, getAllByRole } = renderComponent({
      onChange: onChangekSpy,
    });

    fireEvent.click(container.querySelector('button'));

    const options = getAllByRole('menuitem');
    fireEvent.click(options[1]);

    expect(onChangekSpy).toHaveBeenCalled();
  });

  it('should not call onChange when onClose is clicked', () => {
    const onChangekSpy = jest.fn();
    const { container, getByTestId } = renderComponent({
      onChange: onChangekSpy,
    });

    fireEvent.click(container.querySelector('button'));
    getByTestId('backdrop').click();

    expect(onChangekSpy).not.toHaveBeenCalled();
  });
});
