import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { ReportTypesId } from 'Utils/enums/report';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import Charting from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Charting', () => {
  let chartingWrapper;
  const initialState = {
    user: { user: userLogin, permissions: userPermissions },
    reports: { charts: {}, shareReports: {} },
  };

  const store = mockStore(initialState);
  describe('<Mount the component />', () => {
    beforeEach(() => {
      chartingWrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <Charting defaultReportType={ReportTypesId.Facility} />
          </IntlProvider>
        </Provider>
      );
    });
    it('should the component exists mounted with no params', () => {
      const expected = true;
      const actual = chartingWrapper.exists();

      expect(actual).toBe(expected);
    });

    it('should render UsageVsProductionCharts when default report param is VehicleAndFleetLoadsCharts', () => {
      const expected = true;
      const chartingWrapperEss = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <Charting defaultReportType={ReportTypesId.ESS} />
          </IntlProvider>
        </Provider>
      );
      const actual = chartingWrapperEss.exists();

      expect(actual).toBe(expected);
    });

    describe('#functions', () => {
      it('should test downloadPdf method', () => {
        const expected = true;
        const wrapper = mount(
          <Provider store={store}>
            <IntlProvider locale="en">
              <Charting defaultReportType={ReportTypesId.Energy} />
            </IntlProvider>
          </Provider>
        );
        const downloadPdf = wrapper.find('[data-testid="downloadPdf"]').first();
        downloadPdf.simulate('click');
        const actual = downloadPdf.exists();
        expect(actual).toBe(expected);
      });

      it('should test printReport method', () => {
        const expected = true;
        const printReport = true;
        const wrapper = mount(
          <Provider store={store}>
            <IntlProvider locale="en">
              <Charting
                defaultReportType={ReportTypesId.VehicleAndFleet}
                allowPrintReport={printReport}
              />
            </IntlProvider>
          </Provider>
        );
        const printButton = wrapper.find('[data-testid="printReport"]').first();
        printButton.simulate('click');
        const actual = printButton.exists();
        expect(actual).toBe(expected);
      });

      it('should test downloadReport method', () => {
        const shareReport = true;
        let state;
        const setState = jest.fn((event) => {
          state = event;
        });
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementation((init) => [init, setState]);
        const expected = { modal: 'shareReportModal', isOpen: true };
        const wrapper = mount(
          <Provider store={store}>
            <IntlProvider locale="en">
              <Charting
                defaultReportType={ReportTypesId.ESS}
                allowShareReport={shareReport}
              />
            </IntlProvider>
          </Provider>
        );
        const downloadReport = wrapper
          .find('[data-testid="downloadReport"]')
          .first();
        downloadReport.simulate('click');
        const actual = state;
        expect(actual).toEqual(expected);
      });

      it('should test unmount component with default values', () => {
        let expected = true;
        const wrapper = mount(
          <Provider store={store}>
            <IntlProvider locale="en">
              <Charting />
            </IntlProvider>
          </Provider>
        );
        let actual = wrapper.exists();
        expect(actual).toBe(expected);

        wrapper.unmount();

        actual = wrapper.exists();
        expected = false;
        expect(actual).toBe(expected);
      });
    });
  });
});
