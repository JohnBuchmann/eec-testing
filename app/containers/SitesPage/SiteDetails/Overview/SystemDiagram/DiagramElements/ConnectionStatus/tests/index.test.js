import React from 'react';
import { mount } from 'enzyme';
import ConnectionStatus from '..';
import { IntlProvider } from 'react-intl';
import { SiteConnectionId } from 'Utils/enums/site';

describe('ConnectionStatus', () => {
  it('should display a Connected status when Connected status is sent', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <ConnectionStatus status={SiteConnectionId.Connected} />
        </IntlProvider>
      </svg>
    );

    const actualConnectedStatusImgElement = actualComponent
      .find('[data-testid="content-connected-statusImg"]')
      .first();

    expect(actualConnectedStatusImgElement.exists()).toBeTruthy();
  });

  it('should display a Disconnected status when Disconnected status is sent', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <ConnectionStatus status={SiteConnectionId.Disconnected} />
        </IntlProvider>
      </svg>
    );

    const actualDisconnectedStatusImgElement = actualComponent
      .find('[data-testid="content-disconnected-statusImg"]')
      .first();

    expect(actualDisconnectedStatusImgElement.exists()).toBeTruthy();
  });

  it('should display a Online Cellular status when Cellular status is sent', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <ConnectionStatus status={SiteConnectionId.Cellular} />
        </IntlProvider>
      </svg>
    );

    const actualOnlineCellularStatusImgElement = actualComponent
      .find('[data-testid="content-onlineCellular-statusImg"]')
      .first();

    expect(actualOnlineCellularStatusImgElement.exists()).toBeTruthy();
  });

  it('should display a Unknown status when Unknown status is sent', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <ConnectionStatus status={SiteConnectionId.Unknown} />
        </IntlProvider>
      </svg>
    );

    const actualUnknownStatusImgElement = actualComponent
      .find('[data-testid="content-unknown-statusImg"]')
      .first();

    expect(actualUnknownStatusImgElement.exists()).toBeTruthy();
  });

  it('should display a Unknown status when no status is sent', () => {
    const actualComponent = mount(
      <svg xmlns="http://www.w3.org/2000/svg">
        <IntlProvider locale="en">
          <ConnectionStatus />
        </IntlProvider>
      </svg>
    );

    const actualUnknownStatusImgElement = actualComponent
      .find('[data-testid="content-unknown-statusImg"]')
      .first();

    expect(actualUnknownStatusImgElement.exists()).toBeTruthy();
  });
});
