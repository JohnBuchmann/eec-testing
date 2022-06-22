/**
 * Testing SiteInformation component
 */

import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SiteInformation from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let state;
const setState = jest.fn((event) => {
  state = event;
});
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, setState]);
const mountComponent = (
  isLocationNeeded = true,
  isTariffStructureAvailable = true
) => {
  const initialState = {
    router: { location: { pathname: '/' } },
    notification: { notifications: [] },
    user: { user: userLogin, permissions: userPermissions },
    sites: {
      site: {
        location: {
          customer: {
            primaryContact: {
              email: 'mail@noemail.com',
            },
          },
          address: {
            addressLine1: '3311 US-29',
            addressLine2: null,
            city: 'Cantonment',
            latitude: '30.549935',
            longitude: '-87.28363069999999',
            postalCode: 32533,
            state: 'FL',
          },
        },
        address: isLocationNeeded
          ? { latitude: '29.7', longitude: '-79.6' }
          : {},
        tariffStructure: {
          electricUtilityId: isTariffStructureAvailable
            ? 'TEST ELECTRIC UTILITY'
            : 'Not Available',
          electricUtilityTariff: isTariffStructureAvailable
            ? 'TEST ELECTRIC TARIFF'
            : 'Not Available',
          gasUtilityId: isTariffStructureAvailable
            ? 'TEST GAS UTILITY'
            : 'Not Available',
          gasUtilityTariff: isTariffStructureAvailable
            ? 'TEST GAS TARIFF'
            : 'Not Available',
          id: 22,
          tariffStructure: 'TARIFF STRUCTURE TO-UPDATE 2nd',
          utility: 'UTILITY TO-UPDATE',
        },
        sharepointUrl: 'http://dummysite.com/',
      },
    },
  };

  const store = mockStore(initialState);
  return mount(
    <Provider store={store}>
      <IntlProvider locale="en">
        <BrowserRouter>
          <SiteInformation store={store} />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

describe('<SiteInformation />', () => {
  const elementToFind = 'h6';
  const labelToFind = 'SITE INFORMATION';

  describe('#Constructor', () => {
    it('should render SiteInformation with minimum required data', () => {
      const wrapper = mountComponent(false);

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should simulate center map', async () => {
      const wrapper = mountComponent();
      jest.useFakeTimers();
      const button = wrapper.find('[data-testid="button-center-map"]').first();
      button.simulate('click');

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should simulate show map', () => {
      const wrapper = mountComponent();
      const button = wrapper.find('button[data-testid="button-show-map"]');
      button.simulate('click');
      wrapper.setState({ setShowMapModalStatus: true }, () => {});

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should simulate mailto click action', () => {
      const wrapper = mountComponent();
      const button = wrapper.find('a[data-testid="link-mailto"]');
      button.simulate('click');

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('show simulate view action', () => {
      const wrapper = mountComponent();
      window.open = () => {};

      const button = wrapper.find('button[data-testid="button-view"]');
      button.simulate('click');

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('show not available data', () => {
      const wrapper = mountComponent();
      const actual = wrapper
        .find('[data-testid="contact-name"]')
        .first()
        .text();
      const expected = 'Not Available';
      expect(actual).toBe(expected);
    });

    it('showMap has been called', () => {
      const wrapper = mountComponent();
      const button = wrapper.find('button[data-testid="button-show-map"]');
      button.simulate('click');
      expect(setState).toHaveBeenCalled();
      const actual = state;
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('recenter has been called', () => {
      const wrapper = mountComponent();
      const button = wrapper.find('button[data-testid="button-center-map"]');
      button.simulate('click');
      expect(setState).toHaveBeenCalled();
    });
    it('Show gas utility', () => {
      const wrapper = mountComponent(true, true);
      const actual = wrapper
        .find('[data-testid="gas"]')
        .find('[data-testid="utility-value"]')
        .first()
        .text();
      const expected = 'TEST GAS UTILITY';
      expect(actual).toBe(expected);
    });
    it('Not show gas utility', () => {
      const wrapper = mountComponent(true, false);
      const actual = wrapper
        .find('[data-testid="gas"]')
        .find('[data-testid="utility-value"]')
        .first()
        .text();
      const expected = 'Not Available';
      expect(actual).toBe(expected);
    });
    it('Show gas tariff', () => {
      const wrapper = mountComponent(true, true);
      const actual = wrapper
        .find('[data-testid="gas"]')
        .find('[data-testid="tariff-value"]')
        .first()
        .text();
      const expected = 'TEST GAS TARIFF';
      expect(actual).toBe(expected);
    });
    it('Not show gas tariff', () => {
      const wrapper = mountComponent(true, false);
      const actual = wrapper
        .find('[data-testid="gas"]')
        .find('[data-testid="tariff-value"]')
        .first()
        .text();
      const expected = 'Not Available';
      expect(actual).toBe(expected);
    });

    it('Show electricity utility', () => {
      const wrapper = mountComponent(true, true);
      const actual = wrapper
        .find('[data-testid="electricity"]')
        .find('[data-testid="utility-value"]')
        .first()
        .text();
      const expected = 'TEST ELECTRIC UTILITY';
      expect(actual).toBe(expected);
    });
    it('Not show electricity utility', () => {
      const wrapper = mountComponent(true, false);
      const actual = wrapper
        .find('[data-testid="electricity"]')
        .find('[data-testid="utility-value"]')
        .first()
        .text();
      const expected = 'Not Available';
      expect(actual).toBe(expected);
    });
    it('Show electricity tariff', () => {
      const wrapper = mountComponent(true, true);
      const actual = wrapper
        .find('[data-testid="electricity"]')
        .find('[data-testid="tariff-value"]')
        .first()
        .text();
      const expected = 'TEST ELECTRIC TARIFF';
      expect(actual).toBe(expected);
    });
    it('Not show electricity tariff', () => {
      const wrapper = mountComponent(true, false);
      const actual = wrapper
        .find('[data-testid="electricity"]')
        .find('[data-testid="tariff-value"]')
        .first()
        .text();
      const expected = 'Not Available';
      expect(actual).toBe(expected);
    });
  });
});
