/**
 * Testing our Input component
 */

import { mount } from 'enzyme';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Input from '../index';

const renderComponent = (props = {}) => render(<Input {...props} />);

describe('Input', () => {
  it('should render an input tag', () => {
    const { container } = renderComponent();
    expect(container.querySelector('input')).toBeDefined();
  });

  it('should render an input tag with a helper text', () => {
    const { container } = renderComponent({ invalid: true });
    expect(container.querySelector('p')).toBeDefined();
  });

  it('should fire an event on change', () => {
    const changeInput = jest.fn();
    const { container } = renderComponent({ onChange: changeInput });
    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'Good Day' } });
    expect(changeInput).toHaveBeenCalled();
  });

  describe('#InputWithIcon', () => {
    it('should render an input tag without an icon', () => {
      const { container } = renderComponent();
      expect(container.querySelector('img')).toBeFalsy();
    });

    it('should render an input tag with icon without action', () => {
      const { container } = renderComponent({ icon: 'iconName' });
      expect(container.querySelector('img')).toBeDefined();
    });

    it('should render an input tag with icon with action', () => {
      const iconClickSpy = jest.fn();
      const props = { icon: 'iconName', iconClick: iconClickSpy };
      const wrapper = mount(<Input {...props} />);
      const iconButton = wrapper.find('button');

      iconButton.simulate('click');
      expect(iconClickSpy).toHaveBeenCalled();
    });
  });
});
