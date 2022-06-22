import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';
import { FeatTheme } from 'Theme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { userLogin } from 'Internals/mocks/userLogin';
import TermsAndConditionsPage from '../index';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const consentEffectiveDate = '2022-09-15 12:00:00';
const modalShow = true;
const storeMockData = {
  user: userLogin,
  policy: {
    consentEffectiveDate,
    consentTimestamp: '2021-04-05 16:07:44',
    active: true,
    urlPolicy:
      'https://energybyentech.com/wp-content/uploads/2021/02/EnTech_Solutions_-_Privacy_Policy.pdf',
  },
};
const store = mockStore(storeMockData);

describe('<TermsAndConditionsPage />', () => {
  describe('<TermsAndConditionsPage /> component is mounted', () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <TermsAndConditionsPage />
      </IntlProvider>
    );
    it('should exist terms and conditions page', () => {
      const actual = wrapper.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('<TermsAndConditionsPage /> component is mounted with params data', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <TermsAndConditionsPage
            injectFirst
            theme={FeatTheme}
            openModal={modalShow}
            pdfFile
            effectiveDate={consentEffectiveDate}
          />
        </IntlProvider>
      </Provider>
    );
    it('should display modal title', () => {
      const actual = wrapper
        .find('[data-testid="content-modalTitle"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
