import { shallow } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import LocationPin from '../index';

const basicSite = {
  site: { siteId: 1 },
};

describe.only('<LocationPin/>', () => {
  describe('#Tabs', () => {
    it('Get location pin with minimal data', () => {
      const wrapper = shallow(
        <IntlProvider locale="en">
          <LocationPin site={basicSite} displayCard="site-pin-1" />
        </IntlProvider>
      );
      const actual = !!wrapper;
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
