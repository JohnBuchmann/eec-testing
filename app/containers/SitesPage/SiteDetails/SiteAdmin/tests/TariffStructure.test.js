import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import TariffStructure from '../TariffStructure';

const initialState = {
  user: { user: userLogin, permissions: userPermissions },
  sites: {
    site: {
      tariffStructure: {
        id: 1,
        utility: 'utility update x',
        tariffStructure: 'tariff structure',
        gasUtilityId: 'test gas utility',
        gasUtilityTariff: 'test gas tariff',
        electricUtilityId: 'test electric utility',
        electricUtilityTariff: 'test electric tariff',
      },
      siteId: 1,
    },
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

describe('TariffStructure', () => {
  describe('constructor', () => {
    const originalTariffValue = {
      utility: '',
      tariffStructure: '',
    };
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <TariffStructure data={originalTariffValue} isEditing />
        </IntlProvider>
      </Provider>
    );
    it('should the component exists', () => {
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should exists the panel to render the tariff data', () => {
      const actual = wrapper
        .find('[data-testid="content-tariffStructurePanel"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should exists the header component of the panel', () => {
      const component = wrapper.find(
        '[data-testid="content-tariffStructurePanel"]'
      );
      const actual = component
        .find('[data-testid="content-headerContent"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should exists the content component of the panel', () => {
      const component = wrapper.find(
        '[data-testid="content-tariffStructurePanel"]'
      );
      const actual = component
        .find('[data-testid="content-bodyContent"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
