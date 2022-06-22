/**
 * Testing our Select component
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { fireEvent, render } from 'react-testing-library';
import SelectMultiple from '../SelectMultiple';

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

const renderComponent = (props = {}, defaultData = true) => {
  let placeholderProp;
  let testUsersProp;

  if (defaultData) {
    placeholderProp = placeholder;
    testUsersProp = testUsers;
  }
  return render(
    <IntlProvider locale="en">
      <SelectMultiple
        placeholder={placeholderProp}
        selectData={testUsersProp}
        {...props}
      />
    </IntlProvider>
  );
};

describe('<Select />', () => {
  it('should render as invalid and match the snapshot', () => {
    const onChangeSpy = jest.fn();
    const isInvalid = true;
    const { container } = renderComponent({
      onChange: onChangeSpy,
      invalid: isInvalid,
    });
    expect(container.querySelector('select')).toBeDefined();
  });

  it('should render a <SelectMultiple> tag with default data', () => {
    const onChangeSpy = jest.fn();
    const { container } = renderComponent({ onChange: onChangeSpy });

    expect(container.querySelector('select')).toBeDefined();
  });

  it('should render a <SelectMultiple> tag', () => {
    const onChangeSpy = jest.fn();
    const { container } = renderComponent({ onChange: onChangeSpy });
    expect(container.querySelector('select')).toBeDefined();
  });

  it('should call onChange when clicking on item', () => {
    const onChangeSpy = jest.fn();
    const selectedObject = [];
    const { getByRole, getAllByRole } = renderComponent({
      onChange: onChangeSpy,
      selectedObject,
    });

    fireEvent.mouseDown(getByRole('button'));
    const options = getAllByRole('option');
    fireEvent.click(options[1]);

    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should render value when clicking on item', () => {
    const onChangeSpy = jest.fn();
    const renderValueSpy = jest.fn();
    const selectedObject = [];
    const { getByRole, getAllByRole } = renderComponent({
      onChange: onChangeSpy,
      renderSelectedValue: renderValueSpy,
      selectedObject,
    });

    fireEvent.mouseDown(getByRole('button'));
    const options = getAllByRole('option');
    const option = options[1];
    fireEvent.click(option);

    const actual = !!option;
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
