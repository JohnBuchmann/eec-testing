/**
 * Testing AuditLogItem component
 */

import React from 'react';
import { IntlProvider, intl } from 'react-intl';
import { mount } from 'enzyme';
import AuditLogItem from '../AuditLogItem';

describe('<AuditLogItem />', () => {
  describe('#Constructor', () => {
    const auditLogItemMock = {
      siteId: 1,
      actionType: 'Change in Bus Band Configuration',
      actionDescription:
        'The Bus Band parameter "Bus Band Parameter Name" was changed to Busband New Name. The prior value was Busband Old Name',
      source: 'David Butler',
      date: '1614885453427',
    };
    it('should AuditLogItem exists', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <AuditLogItem
            intl={intl}
            key={auditLogItemMock.siteId}
            id={auditLogItemMock.siteId}
            date={auditLogItemMock.date}
            title={auditLogItemMock.actionType}
            description={auditLogItemMock.actionDescription}
            author={auditLogItemMock.source}
          />
        </IntlProvider>
      );

      const actual = wrapper.find('[data-testid="auditLogItemId"]').exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
