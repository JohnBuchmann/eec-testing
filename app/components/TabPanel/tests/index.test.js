import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import TabPanel from '../index';
const mock = {
  value: 0,
  index: [0],
  children: 'Test',
};

describe('<TabPanel />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <TabPanel value={mock.value} tabIndexList={mock.index}>
          {mock.children}
        </TabPanel>
      </IntlProvider>
    );
    expect(firstChild).toMatchSnapshot();
  });
});
