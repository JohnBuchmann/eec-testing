import React from 'react';
import { mount } from 'enzyme';
import Loader from '..';

describe('<Loader />', () => {
  const mountComponent = (props) => mount(<Loader {...props} />);

  it('should render <Loader /> without loading spinner', () => {
    const loaderWrapper = mountComponent();
    const expected = 0;
    const actual = loaderWrapper.find('[data-testid="container-modalProgress"]')
      .length;

    expect(actual).toBe(expected);
  });

  it('should render <Loader /> with loading spinner', () => {
    const loaderWrapper = mountComponent({ open: true });
    const expected = true;
    const actual = loaderWrapper
      .find('[data-testid="container-modalProgress"]')
      .first()
      .exists();

    expect(actual).toBe(expected);
  });
});
