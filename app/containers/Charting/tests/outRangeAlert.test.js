import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import OutRangeAlert from '../outRangeAlert';

describe('<OutRangeAlert />', () => {
  const componentMount = mount(
    <IntlProvider locale="en">
      <OutRangeAlert />
    </IntlProvider>
  );
  it('should the component exist mounted', () => {
    const expected = true;
    const actual = componentMount.exists();

    expect(actual).toBe(expected);
  });

  it('should click on button "OK" and disappear alert', () => {
    const expected = false;
    componentMount
      .find('[data-testid="content-okButton"]')
      .at(0)
      .simulate('click');

    const actual = componentMount
      .find('[data-testid="alertContainer"]')
      .first()
      .exists();
    expect(actual).toBe(expected);
  });
});
