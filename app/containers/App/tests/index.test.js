import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  describe('#Constructor', () => {
    it('should render this component', () => {
      const initialState = {
        data: [],
        router: { location: { pathname: '/' } },
        notification: { notifications: [] },
      };
      const store = mockStore(initialState);
      const wrapper = shallow(
        <Provider store={store}>
          <IntlProvider locale="en">
            <BrowserRouter>
              <App store={store} />
            </BrowserRouter>
          </IntlProvider>
        </Provider>
      );
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
