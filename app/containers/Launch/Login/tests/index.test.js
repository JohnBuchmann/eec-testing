import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { oktaSignInConfig } from 'system/auth';
import OktaLogin from '..';

Enzyme.configure({ adapter: new Adapter() });

const mockHandleLoginRedirect = jest
  .fn()
  .mockImplementation(() => Promise.resolve());

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    oktaAuth: {
      handleLoginRedirect: mockHandleLoginRedirect,
    },
    authState: {
      isAuthenticated: false,
      isPending: false,
    },
    authService: {},
  }),
}));

const initialState = {};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

describe('<OktaLogin />', () => {
  describe('<OktaLogin /> component is mounted', () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <OktaLogin config={oktaSignInConfig} />
      </IntlProvider>
    );
    it('Login component should exists', () => {
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('<OktaLogin /> validates oktaAuth', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <OktaLogin config={oktaSignInConfig} />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    );
    it('should oktaWidget component exists', () => {
      const oktaSignInWidget = wrapper.find('[data-testid="oktaSignInWidget"]');
      const actual = oktaSignInWidget.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should okta widget callback onSuccess method', () => {
      const oktaSignInWidget = wrapper.find('[data-testid="oktaSignInWidget"]');
      oktaSignInWidget
        .first()
        .props()
        .onSuccess();
      const actual = mockHandleLoginRedirect;
      expect(actual).toHaveBeenCalled();
    });
    it('should okta widget callback onError method', () => {
      const oktaSignInWidget = wrapper.find('[data-testid="oktaSignInWidget"]');
      const actual = jest.spyOn(console, 'log');
      oktaSignInWidget
        .first()
        .props()
        .onError();
      expect(actual).toHaveBeenCalled();
    });
  });
});
