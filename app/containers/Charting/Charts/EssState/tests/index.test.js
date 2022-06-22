import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { IntervalCatalog } from 'Utils/enums/interval';
import EssStateCharts from '..';

const workingReportConfigBase = {
  charts: [
    { name: 'ESS at Max', value: 25 },
    { name: 'ESS at Min', value: 18 },
    { name: 'ESS in Use', value: 57 },
  ],
  config: {
    interval: { value: 'Month', text: 'By Month' },
    scale: { value: 'Auto', text: 'Auto' },
  },
};

const mountComponent = (workingReportConfig) =>
  mount(
    <IntlProvider locale="en">
      <EssStateCharts reportConfig={workingReportConfig} />
    </IntlProvider>
  );

const intervals = [
  IntervalCatalog.day,
  IntervalCatalog.month,
  IntervalCatalog.quarter,
  IntervalCatalog.year,
  '',
];

describe('<EssStateCharts />', () => {
  describe('<EssStateCharts /> is mounted', () => {
    test.each(intervals)('should test each option for intervals %p', (item) => {
      const expected = true;
      const wrapper = mountComponent({
        ...workingReportConfigBase,
        interval: item,
      });
      const actual = wrapper.exists();
      expect(actual).toEqual(expected);
    });
  });
});
