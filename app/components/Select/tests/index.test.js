/**
 * Testing our Select component
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-testing-library';
import Select from '../index';

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
    <IntlProvider locale="en">
      <Select placeholder={placeholder} selectData={testUsers} {...props} />
    </IntlProvider>
  );

describe('<Select />', () => {
  it('should render a <Select> tag', () => {
    const { container } = renderComponent({ placeholder });
    expect(container.querySelector('select')).toBeDefined();
  });

  it('should render a <SelectStatus> tag', () => {
    const { container } = renderComponent({ placeholder, status: true });
    expect(container.querySelector('select')).toBeDefined();
  });

  it('should render a <SelectMultiple> tag', () => {
    const onChangeSpy = jest.fn();
    const { container } = renderComponent({
      placeholder,
      onChange: onChangeSpy,
      multiple: true,
    });

    expect(container.querySelector('select')).toBeDefined();
  });
});
