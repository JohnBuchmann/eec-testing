/**
 * Testing Support component
 */

import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Support from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mountComponent = (isDataAvailable = true) => {
  const initialState = {
    router: { location: { pathname: '/' } },
    notification: { notifications: [] },
    user: { user: userLogin, permissions: userPermissions },
    sites: {
      site: {
        icianName: isDataAvailable ? 'John Doe' : null,
        icianPhoneNumber: '(800) 800-0000',
        externalIcianId: 'mail@noemail.com',
        secondaryIcianId: 'mail@noemail.com',
        secondaryIcianName: 'Jane Doe',
        secondaryIcianPhoneNumber: '(800) 800-0000',
      },
    },
  };

  const store = mockStore(initialState);
  return mount(
    <Provider store={store}>
      <IntlProvider locale="en">
        <BrowserRouter>
          <Support store={store} />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

describe('<Support />', () => {
  const elementToFind = 'h6';
  const labelToFind = 'Miau';

  describe('#Constructor', () => {
    it('should render Support with minimum required data', () => {
      const wrapper = mountComponent(true);

      const h6Container = wrapper.find(elementToFind);
      const foundText = h6Container.findWhere(
        (item) => item.text() === labelToFind
      );
      const actual = !!foundText;
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('show "Not Available" data', () => {
      const wrapper = mountComponent(false);
      const actual = wrapper
        .find('[data-testid="primary-ician-name"]')
        .first()
        .text();
      const expected = 'Not Available';
      expect(actual).toBe(expected);
    });

    it('show data', () => {
      const wrapper = mountComponent(true);
      const actual = wrapper
        .find('[data-testid="primary-ician-name"]')
        .first()
        .text();
      const expected = 'John Doe';
      expect(actual).toBe(expected);
    });

    it('show data', () => {
      const wrapper = mountComponent(true);
      const actual = wrapper
        .find('[data-testid="secondary-ician-name"]')
        .first()
        .text();
      const expected = 'Jane Doe';
      expect(actual).toBe(expected);
    });

    it('Dont show link', () => {
      const wrapper = mountComponent(true);
      const actual = wrapper
        .find('[data-testid="link-url"]')
        .first()
        .text();
      const expected = 'Energybyentech.com';
      expect(actual).toBe(expected);
    });

    it('Show e-mail', () => {
      const wrapper = mountComponent(true);
      const actual = wrapper
        .find('[data-testid="link-mailto"]')
        .first()
        .text();
      const expected = 'mail@noemail.com';
      expect(actual).toBe(expected);
    });
  });
});
