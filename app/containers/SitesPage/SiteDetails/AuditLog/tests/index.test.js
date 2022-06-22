/**
 * Testing Audit Log Component
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import auditLogList from 'Internals/mocks/auditLogList';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import history from 'Utils/history';
import AuditLog from '..';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
Enzyme.configure({ adapter: new Adapter() });

describe('<AuditLog />', () => {
  const mountComponent = (props) => {
    // Assigning into a variable because is not allowed to extend with ES6 by eslint rules.
    const propsExtended = { ...props, filteredSiteAuditLogs: auditLogList };
    const site = {
      auditLogs: auditLogList,
      auditLogsFilters: { text: '' },
      live: false,
    };

    const initialState = {
      sites: { site },
      user: {
        user: userLogin,
        permissions: userPermissions,
      },
    };
    const store = mockStore(initialState);
    return mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <AuditLog props={propsExtended} store={store} history={history} />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
  };
  describe('Header', () => {
    it('should render header', () => {
      const wrapper = mountComponent({});
      const actual = wrapper
        .find('h6')
        .at(0)
        .text();
      const expected = 'AUDIT LOG';
      expect(actual).toBe(expected);
    });
  });

  describe('Input', () => {
    it('should render input', () => {
      const wrapper = mountComponent({});
      const actual = wrapper.find('input').length;
      const expected = 1;
      expect(actual).toBe(expected);
    });
  });

  describe('Audit log list', () => {
    it('should render audit log list', () => {
      const wrapper = mountComponent({});

      const actual = wrapper.find('div[data-testid="auditLogListContainer"]')
        .length;
      const expected = 1;
      expect(actual).toBe(expected);
    });
  });

  describe('Input changes', () => {
    it('should search for specific text', () => {
      const wrapper = mountComponent({});

      const input = wrapper.find('input[type="text"]');
      const author = 'Changed By:  David Butler';
      input.simulate('change', { target: { value: author } });
      const actual = wrapper
        .find('div[data-testid="auditLogItemAuthor"]')
        .first()
        .text();
      const expected = author;
      expect(actual).toBe(expected);
    });
  });

  describe('Input changes', () => {
    it('should set data', () => {
      const wrapper = mountComponent({});
      const dummyText = 'Anexinet';
      const input = wrapper.find('input[type="text"]');
      input.simulate('change', { target: { value: dummyText } });
      const actual = wrapper.find('div[data-testid="auditLogItemId"]').length;
      const expected = 1;
      expect(actual).toBeGreaterThanOrEqual(expected);
    });
  });
});
