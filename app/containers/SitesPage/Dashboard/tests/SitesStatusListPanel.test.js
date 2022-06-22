import React from 'react';
import { shallow } from 'enzyme';

import { IntlProvider } from 'react-intl';

import sitesListMock from 'Internals/mocks/sitesListMock';

import SitesStatusListPanel from '../SitesStatusListPanel';

describe('<SitesStatusListPanel />', () => {
  describe('<SitesStatusListPanel />', () => {
    it('should do a test of the component and exists contentBody and actions', () => {
      const sites = sitesListMock;
      const wrapper = shallow(
        <IntlProvider locale="en">
          <SitesStatusListPanel sites={sites} />
        </IntlProvider>
      );
      const component = wrapper.dive();
      const sitePanel = component.find(
        '[data-testid="content-siteStatusPanel"]'
      );
      const actions = sitePanel
        .dive()
        .find('[data-testid="content-selectStatusList"]');
      const contentBody = sitePanel
        .dive()
        .find('[data-testid="content-siteCard"]');
      const expected = true;
      expect(sitePanel.exists()).toBe(expected);
      expect(contentBody.exists()).toBe(expected);
      expect(actions.exists()).toBe(expected);
    });

    it('should not render Site Card when there are no sites', () => {
      const sites = [];
      const wrapper = shallow(
        <IntlProvider locale="en">
          <SitesStatusListPanel sites={sites} />
        </IntlProvider>
      );
      const component = wrapper.dive();
      const sitePanel = component.find(
        '[data-testid="content-siteStatusPanel"]'
      );
      const contentBody = sitePanel
        .dive()
        .find('[data-testid="content-siteCard"]');
      const expected = false;
      const actual = contentBody.exists();
      expect(actual).toBe(expected);
    });
  });

  describe('<GoogleMapReact />', () => {
    const sites = sitesListMock;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const wrapper = shallow(
      <IntlProvider locale="en">
        <SitesStatusListPanel sites={sites} switchView />
      </IntlProvider>
    );
    const component = wrapper.dive();
    const sitePanel = component.find('[data-testid="content-siteStatusPanel"]');
    const contentMap = sitePanel
      .dive()
      .find('[data-testid="content-SitesMap"]');
    const locationPin = contentMap.find('[data-testid="content-locationPin"]');

    it('should have sites data in props and be the same of the sites received', () => {
      const sitesData = wrapper.props().sites;
      const actual = sitesData.length;
      const expected = sites.length;
      expect(actual).toBe(expected);
    });

    it('should do a test of the component and exists contentMap', () => {
      expect(locationPin.exists()).toBe(true);
      expect(contentMap.exists()).toBe(true);
    });

    it('should do handle the children click to display the siteCard', () => {
      contentMap.props().onChildClick('site-pin-1');
      expect(setState).toHaveBeenCalledWith('site-pin-1');
    });
  });
});
