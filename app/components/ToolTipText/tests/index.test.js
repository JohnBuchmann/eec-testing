import React from 'react';
import { mount } from 'enzyme';
import ToolTipText from '../index';

describe('<ToolTipText />', () => {
  const mockTitle = 'Test Title';
  const mockPlacement = 'right';
  const mountComponent = () =>
    mount(<ToolTipText title={mockTitle} placement={mockPlacement} />);
  const wrapper = mountComponent();

  it('should exist component', () => {
    const expected = true;
    const actual = wrapper.exists();
    expect(actual).toEqual(expected);
  });

  it('should render component', () => {
    const expected = true;
    const tooltip = wrapper.find('[data-testid="tooltip-component"]').first();
    const actual = tooltip.exists();
    expect(actual).toEqual(expected);
  });
});
