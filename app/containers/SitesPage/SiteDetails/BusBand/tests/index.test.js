import { mount } from 'enzyme';
import { userLogin, userPermissions } from 'Internals/mocks/userLogin';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { formatBusBandData } from 'Store/Sites/reducer';
import { SET_BUS_BAND_STATUS } from 'Store/Sites/types';
import { busBandEditingStatus } from 'Utils/busband';
import history from 'Utils/history';
import BusBand, { createTimer } from '../index';

const busBandMock = {
  name: 'BusBand',
  id: 344,
  group: [
    {
      name: 'PeakDemand',
      label: 'Peak Demand',
      points: [
        {
          id: 1,
          name: 'PV_SP',
          label: 'PV Setpoint',
          value: '123',
        },
        {
          id: 2,
          name: 'Wind_SP',
          label: 'Wind Setpoint',
          value: '123',
        },
      ],
    },
  ],
  points: [
    {
      id: 23,
      name: 'ActiveConfiguration',
      value: '1',
    },
  ],
};
const siteBusBandMock = {
  site: {
    busBand: {
      configuration: busBandMock,
      formattedConfiguration: formatBusBandData(busBandMock),
    },
  },
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  sites: siteBusBandMock,
  user: {
    user: userLogin,
    permissions: userPermissions,
  },
};
let store;
let busBandWrapper;

describe('<BusBand />', () => {
  beforeEach(() => {
    store = mockStore(() => initialState);
    busBandWrapper = mount(
      <BrowserRouter>
        <IntlProvider locale="en">
          <BusBand store={store} history={history} />
        </IntlProvider>
      </BrowserRouter>
    );
  });
  describe('<Mount the component />', () => {
    it('should the component exists mounted', () => {
      const expected = true;
      const actual = busBandWrapper.exists();

      expect(actual).toBe(expected);
    });
  });

  describe('Mount the component', () => {
    it('should the component exists mounted without data to display', () => {
      const emptyBusbandMock = {
        site: {
          busBand: {
            configuration: {},
            formattedConfiguration: {},
          },
        },
      };
      const initialEmptyState = {
        sites: emptyBusbandMock,
        user: {
          user: userLogin,
          permissions: userPermissions,
        },
      };
      const emptyStore = mockStore(initialEmptyState);
      const wrapper = mount(
        <BrowserRouter>
          <IntlProvider locale="en">
            <BusBand store={emptyStore} history={history} />
          </IntlProvider>
        </BrowserRouter>
      );
      const component = wrapper
        .find('[data-testid="content-no-data-placeholder"]')
        .first();
      const expected = true;
      const actual = component.exists();
      expect(actual).toBe(expected);
    });
  });

  describe('#bus band grid', () => {
    it('#should hide edit button when click on edit button', () => {
      const expected = 0;
      const editButton = busBandWrapper
        .find('[data-testid="edit-icon-column"]')
        .first();

      editButton.simulate('click');

      const actual = busBandWrapper.find('[data-testid="edit-icon-column"]')
        .length;

      expect(actual).toBe(expected);
    });

    it('#should show edit input text when click on edit button', () => {
      const expected = 0;
      const editButton = busBandWrapper
        .find('[data-testid="edit-icon-column"]')
        .first();

      editButton.simulate('click');

      const actual = busBandWrapper
        .find('[data-testid="bus-band-table"]')
        .first()
        .find('[data-testid="bus-band-table-body"]')
        .first()
        .find('LabelEdit').length;

      expect(actual).toBeGreaterThanOrEqual(expected);
    });

    it('#should edit input text', () => {
      const headerTableCells = busBandWrapper
        .find('[data-testid="bus-band-table"]')
        .first()
        .find('[data-testid="bus-band-table-header"]')
        .first()
        .find('[data-testid="bus-band-table-row"]')
        .first()
        .find('th');

      let columnEditable;
      let columnEditableIdx;
      for (
        let cellIndex = 0;
        cellIndex < headerTableCells.length;
        cellIndex += 1
      ) {
        if (
          headerTableCells
            .at(cellIndex)
            .find('div')
            .first()
            .find('[data-testid="edit-icon-column"]').length
        ) {
          columnEditable = headerTableCells.at(cellIndex);
          columnEditableIdx = cellIndex;
          break;
        }
      }

      if (columnEditable) {
        const expected = '';
        columnEditable
          .find('div')
          .first()
          .find('[data-testid="edit-icon-column"]')
          .first()
          .simulate('click');

        // Simulate editing available
        store.dispatch({
          type: SET_BUS_BAND_STATUS,
          payload: {
            status: busBandEditingStatus.Available,
            message: '',
          },
        });

        // Look for label edit on the editable column
        const inputLabelEdit = busBandWrapper
          .find('[data-testid="bus-band-table"]')
          .first()
          .find('[data-testid="bus-band-table-body"]')
          .first()
          .find('[data-testid="bus-band-table-body-row"]')
          .findWhere((row) =>
            row
              .find('td')
              .at(columnEditableIdx + 1)
              .find('LabelEdit')
              .first()
              .find('input')
          )
          .first()
          .find('td')
          .at(columnEditableIdx + 1)
          .find('LabelEdit')
          .first()
          .find('input')
          .first();

        inputLabelEdit.simulate('change', { target: { value: expected } });
        inputLabelEdit.simulate('blur');

        const actual = busBandWrapper
          .find('[data-testid="bus-band-table"]')
          .first()
          .find('[data-testid="bus-band-table-body"]')
          .first()
          .find('[data-testid="bus-band-table-body-row"]')
          .findWhere((row) =>
            row
              .find('td')
              .at(columnEditableIdx + 1)
              .find('LabelEdit')
              .first()
              .find('input')
          )
          .first()
          .find('td')
          .at(columnEditableIdx + 1)
          .find('LabelEdit')
          .first()
          .find('input')
          .first()
          .prop('value');

        expect(actual).toBe(expected);
      }
    });
  });

  describe('#bus band grid with actions', () => {
    let columnEditable;
    let columnEditableIdx = -1;

    beforeEach(() => {
      const headerTableCells = busBandWrapper
        .find('[data-testid="bus-band-table"]')
        .first()
        .find('[data-testid="bus-band-table-header"]')
        .first()
        .find('[data-testid="bus-band-table-row"]')
        .first()
        .find('th');

      columnEditable = null;
      columnEditableIdx = -1;
      for (
        let cellIndex = 0;
        cellIndex < headerTableCells.length;
        cellIndex += 1
      ) {
        if (
          headerTableCells
            .at(cellIndex)
            .find('div')
            .first()
            .find('[data-testid="edit-icon-column"]').length
        ) {
          columnEditable = headerTableCells.at(cellIndex);
          columnEditableIdx = cellIndex;
          break;
        }
      }
    });

    it('#should show menu actions when when click on edit button', () => {
      if (columnEditableIdx > -1) {
        const expected = 1;
        columnEditable
          .find('div')
          .first()
          .find('[data-testid="edit-icon-column"]')
          .first()
          .simulate('click');

        const actual = busBandWrapper.find(
          '[data-testid="content-header-actions"]'
        ).length;

        expect(actual).toBeGreaterThanOrEqual(expected);
      }
    });

    it('#should retain value on updated field when click on save button', () => {
      if (columnEditableIdx > -1) {
        const expectNewValue = '123';
        columnEditable
          .find('div')
          .first()
          .find('[data-testid="edit-icon-column"]')
          .first()
          .simulate('click');

        const saveButton = busBandWrapper
          .find('[data-testid="save-action"]')
          .first()
          .find('button');

        busBandWrapper
          .find('[data-testid="bus-band-table"]')
          .first()
          .find('[data-testid="bus-band-table-body"]')
          .first()
          .find('[data-testid="bus-band-table-body-row"]')
          .findWhere((row) =>
            row
              .find('td')
              .at(columnEditableIdx + 1)
              .find('LabelEdit')
              .first()
              .find('input')
          )
          .first()
          .find('td')
          .at(columnEditableIdx + 1)
          .find('LabelEdit')
          .first()
          .find('input')
          .first()
          .simulate('change', { target: { value: expectNewValue } });

        saveButton.simulate('click');

        const newValueRendered = busBandWrapper
          .find('[data-testid="bus-band-table"]')
          .first()
          .find('[data-testid="bus-band-table-body"]')
          .first()
          .find('[data-testid="bus-band-table-body-row"]')
          .findWhere((row) =>
            row
              .find('td')
              .at(columnEditableIdx)
              .find('LabelEdit')
              .first()
              .find('input')
          )
          .first()
          .find('td')
          .at(columnEditableIdx)
          .find('LabelEdit')
          .first()
          .find('span')
          .text();

        expect(newValueRendered).toBe(expectNewValue);
      }
    });

    it('#should not retain value on updated field when click on save button', () => {
      if (columnEditableIdx > -1) {
        const newValue = '123';
        columnEditable
          .find('div')
          .first()
          .find('[data-testid="edit-icon-column"]')
          .first()
          .simulate('click');
        const cancelButton = busBandWrapper
          .find('[data-testid="cancel-action"]')
          .first()
          .find('button');

        const expected = busBandWrapper
          .find('[data-testid="bus-band-table"]')
          .first()
          .find('[data-testid="bus-band-table-body"]')
          .first()
          .find('[data-testid="bus-band-table-body-row"]')
          .findWhere((row) =>
            row
              .find('td')
              .at(columnEditableIdx)
              .find('LabelEdit')
              .first()
              .find('input')
          )
          .first()
          .find('td')
          .at(columnEditableIdx)
          .find('LabelEdit')
          .first()
          .find('span')
          .text();

        busBandWrapper
          .find('[data-testid="bus-band-table"]')
          .first()
          .find('[data-testid="bus-band-table-body"]')
          .first()
          .find('[data-testid="bus-band-table-body-row"]')
          .findWhere((row) =>
            row
              .find('td')
              .at(columnEditableIdx + 1)
              .find('LabelEdit')
              .first()
              .find('input')
          )
          .first()
          .find('td')
          .at(columnEditableIdx + 1)
          .find('LabelEdit')
          .first()
          .find('input')
          .first()
          .simulate('change', { target: { value: newValue } });

        cancelButton.simulate('click');
        const actual = busBandWrapper
          .find('[data-testid="bus-band-table"]')
          .first()
          .find('[data-testid="bus-band-table-body"]')
          .first()
          .find('[data-testid="bus-band-table-body-row"]')
          .findWhere((row) =>
            row
              .find('td')
              .at(columnEditableIdx)
              .find('LabelEdit')
              .first()
              .find('input')
          )
          .first()
          .find('td')
          .at(columnEditableIdx)
          .find('LabelEdit')
          .first()
          .find('span')
          .text();

        expect(actual).toBe(expected);
      }
    });

    it('should create a timer', () => {
      const actual = createTimer(() => {});
      const expected = false;

      expect(actual).toBe(expected);
    });
  });
});
