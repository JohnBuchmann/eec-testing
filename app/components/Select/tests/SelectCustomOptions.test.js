/**
 * Testing our Select component
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import SelectCustomOptions from '../SelectCustomOptions';

const placeholder = 'TEST';
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
  render(
    <SelectCustomOptions
      placeholder={placeholder}
      selectData={testUsers}
      {...props}
    />
  );

describe('<Select />', () => {
  it('should render when invalid is sent', () => {
    const onChangeSpy = jest.fn();
    const isInvalid = true;
    const { container } = render(
      <SelectCustomOptions onChange={onChangeSpy} invalid={isInvalid} />
    );

    expect(container.querySelector('select')).toBeDefined();
  });

  it('should render a <SelectMultiple> tag with default data', () => {
    const { container } = render(<SelectCustomOptions />);

    expect(container.querySelector('select')).toBeDefined();
  });

  it('should render a <SelectCustomOptions> tag', () => {
    const { container } = renderComponent({ placeholder });
    expect(container.querySelector('select')).toBeDefined();
  });

  it('should handle click when an option is clicked', () => {
    const onClickSpy = jest.fn();
    const { getByRole, getAllByRole } = renderComponent({
      onChange: onClickSpy,
    });

    fireEvent.mouseDown(getByRole('button'));

    expect(getAllByRole('option')).toBeDefined();
    expect(getAllByRole('option').length).toEqual(testUsers.length);

    getAllByRole('option')[1].click();
    expect(onClickSpy).toHaveBeenCalled();
  });
});
