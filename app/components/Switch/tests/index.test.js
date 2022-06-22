import images from 'Assets/images';
import React from 'react';
import { render } from 'react-testing-library';
import {
  getDefaultToggleOptions,
  offLabel,
  onLabel,
} from '../../../utils/toggle';
import Switch from '../index';

const renderComponent = (props = {}) => render(<Switch {...props} />);

describe('<Switch />', () => {
  let defaultToggleOptions;

  beforeEach(() => {
    defaultToggleOptions = getDefaultToggleOptions();
  });

  it('should render <Switch> component', () => {
    const { getByText } = renderComponent({
      leftOption: defaultToggleOptions.left,
      rightOption: defaultToggleOptions.right,
      value: offLabel,
      disabled: defaultToggleOptions.disabled,
    });

    expect(getByText(onLabel)).toBeTruthy();
    expect(getByText(offLabel)).toBeTruthy();
  });

  it('should renders with a alternative className', () => {
    const useAlternativeColor = true;
    const { getByValue } = renderComponent({
      leftOption: defaultToggleOptions.left,
      rightOption: defaultToggleOptions.right,
      value: offLabel,
      alternativeColor: useAlternativeColor,
      disabled: defaultToggleOptions.disabled,
    });

    const leftToggleButton = getByValue(
      defaultToggleOptions.left.value.toString()
    );
    expect(leftToggleButton.classList.contains('makeStyles-alt-3')).toBe(true);
  });

  it('should render without icon ', () => {
    const expected = null;
    const {
      left: leftOption,
      right: rightOption,
      disabled,
    } = defaultToggleOptions;
    const { getByValue } = renderComponent({
      leftOption,
      rightOption,
      value: offLabel,
      disabled,
    });

    const leftToggleButton = getByValue(
      defaultToggleOptions.left.value.toString()
    );

    const actual = leftToggleButton.querySelector('img');

    expect(actual).toBe(expected);
  });

  it('should render with icon ', () => {
    const {
      left: leftOption,
      right: rightOption,
      disabled,
    } = defaultToggleOptions;

    leftOption.icon = images.viewList;
    rightOption.icon = images.viewMap;

    const { getByValue } = renderComponent({
      leftOption,
      rightOption,
      value: offLabel,
      disabled,
    });

    const leftToggleButton = getByValue(
      defaultToggleOptions.left.value.toString()
    );

    const actual = leftToggleButton.querySelector('img');

    expect(actual).toBeDefined();
  });
});
