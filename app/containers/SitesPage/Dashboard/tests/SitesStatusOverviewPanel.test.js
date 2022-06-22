import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import sitesListMock from 'Internals/mocks/sitesListMock';

import messages from '../../messages';

import SitesStatusOverviewPanel from '../SitesStatusOverviewPanel';

describe('<SitesStatusOverviewPanel />', () => {
  const sites = sitesListMock;
  const { defaultMessage: title } = messages.title;
  const wrapper = mount(
    <IntlProvider locale="en">
      <SitesStatusOverviewPanel sites={sites} title={title.toUpperCase()} />
    </IntlProvider>
  );
  const { props } = wrapper.props().children;
  it('should render and exists', () => {
    const actual = wrapper.exists();
    const expected = true;
    expect(actual).toBe(expected);
  });
  it('should have the sites in props', () => {
    const actual = props.sites.length;
    const expected = sites.length;
    expect(actual).toBe(expected);
  });
});
