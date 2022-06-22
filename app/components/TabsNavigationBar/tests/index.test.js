import React from 'react';
import { mount } from 'enzyme';
import TabsNavigationBar from '..';
import history from 'Utils/history';

import tabs from '../../../../internals/mocks/tabsNavigationBarList';

describe('TabsNavigationBar', () => {
  describe('#Constructor', () => {
    it('should render the header component', () => {
      const historyMock = jest.spyOn(history, 'listen');

      const wrapper = mount(<TabsNavigationBar tabs={tabs} {...historyMock} />);
      const actual = wrapper.find('header').exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });

  describe('#TabsContainer', () => {
    it('should render the tab list component', () => {
      const historyMock = jest.spyOn(history, 'listen');

      const wrapper = mount(<TabsNavigationBar tabs={tabs} {...historyMock} />);
      const actual = wrapper.find('div[role="tablist"]').length;
      const expected = 1;
      expect(actual).toBe(expected);
    });
  });

  describe('#Tab', () => {
    it('should render button tab component', () => {
      const historyMock = jest.spyOn(history, 'listen');

      const wrapper = mount(<TabsNavigationBar tabs={tabs} {...historyMock} />);
      const actual = wrapper.find('button[role="tab"]').length;
      const expected = 6;
      expect(actual).toBe(expected);
    });
  });

  describe('#TabPanel', () => {
    it('should render the tab panel component', () => {
      const historyMock = jest.spyOn(history, 'listen');

      const wrapper = mount(<TabsNavigationBar tabs={tabs} {...historyMock} />);
      const actual = wrapper.find('div[role="tabpanel"]').length;
      const expected = 6;
      expect(actual).toBe(expected);
    });
  });

  describe('Set data', () => {
    it('should render selected option at specific index and mark it as selected', () => {
      let tabSelected;
      const eventChangeFn = jest.fn(() => true);
      const eventClickFn = jest.fn(() => true);
      const setState = jest.fn((status) => {
        tabSelected = status;
      });
      const useStateSpy = jest.spyOn(React, 'useState');
      useStateSpy.mockImplementation((init) => [init, setState]);
      const historyMock = jest.spyOn(history, 'listen');
      const wrapper = mount(
        <TabsNavigationBar
          tabs={tabs}
          eventChangeTab={eventChangeFn}
          eventClickTab={eventClickFn}
          {...historyMock}
        />
      );
      const navigationBar = wrapper.find(
        'div[aria-label="site-details-navigation-bar"]'
      );
      const tabIndex = 2;
      const buttons = navigationBar.find('button');
      const button = buttons.at(tabIndex);
      button.simulate('click');

      expect(setState).toHaveBeenCalled();
      expect(eventChangeFn).toHaveBeenCalled();
      expect(eventClickFn).toHaveBeenCalled();
      const actual = tabSelected;
      const expected = tabIndex;
      expect(actual).toBe(expected);
    });

    it('should render selected option disabled at specific index and mark it as selected', () => {
      const disabled = true;
      const eventChangeFn = jest.fn(() => true);
      const eventClickFn = jest.fn(() => true);
      const historyMock = jest.spyOn(history, 'listen');

      const wrapper = mount(
        <TabsNavigationBar
          tabs={tabs}
          eventChangeTab={eventChangeFn}
          eventClickTab={eventClickFn}
          disabledTabs={disabled}
          {...historyMock}
        />
      );
      const navigationBar = wrapper.find(
        'div[aria-label="site-details-navigation-bar"]'
      );
      const tabIndex = 2;
      const buttons = navigationBar.find('button');
      const button = buttons.at(tabIndex);
      button.simulate('click');

      expect(eventChangeFn).not.toHaveBeenCalled();
      expect(eventClickFn).toHaveBeenCalled();
    });
  });

  describe('No props', () => {
    it('should not render the header component without props', () => {
      const historyMock = jest.spyOn(history, 'listen');

      const wrapper = mount(<TabsNavigationBar {...historyMock} />);
      const actual = wrapper.find('header').length;
      const expected = 0;
      expect(actual).toBe(expected);
    });
  });
});
