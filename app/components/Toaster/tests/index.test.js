import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ToastEvent } from 'Utils/enums/toaster';
import Toaster from '..';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

describe('<Toaster />', () => {
  const mountComponent = (props) =>
    mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <Toaster {...props} />
        </IntlProvider>
      </Provider>
    );

  it('should render <Toaster /> without data', () => {
    const toasterWrapper = mountComponent();
    const expected = 1;
    const actual = toasterWrapper.find('[data-testid="snack-bar-toast-div"]')
      .length;
    expect(actual).toBe(expected);
  });

  it('should render <Toaster /> with data and open and error', () => {
    const props = {
      toastOptions: {
        showToast: true,
        event: ToastEvent.Error,
      },
    };
    const toasterWrapper = mountComponent(props);
    const expected = true;
    const mainDiv = toasterWrapper
      .find('[data-testid="snack-bar-toast-div"]')
      .first();
    const actual = mainDiv.exists();
    mainDiv.simulate('click');
    expect(actual).toBe(expected);
  });

  it('should render <Toaster /> and close it', () => {
    const props = {
      toastOptions: {
        showToast: true,
        event: ToastEvent.Error,
      },
    };
    const toasterWrapper = mountComponent(props);
    const mainDiv = toasterWrapper.find('button');
    mainDiv.simulate('click');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
