/**
 * Testing our Accordion component
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import ShallowRenderer from 'react-test-renderer/shallow';
import { IntlProvider } from 'react-intl';

import Accordion from '../index';

const renderer = new ShallowRenderer();

const title = 'Accordion Test Title';
const accordionBodyContent = <h1>Test</h1>;
const icon = '#';
const isAccordionOpen = false;
const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <Accordion
        title={title}
        icon={icon}
        isAccordionOpen={isAccordionOpen}
        {...props}
      >
        {accordionBodyContent}
      </Accordion>
    </IntlProvider>
  );

describe('<Accordion />', () => {
  describe('#constructor', () => {
    it('should render a <Accordion> tag to change route if the handleRoute prop is specified', () => {
      const { container } = renderComponent({ title });
      expect(container.querySelector('accordion')).toBeDefined();
    });

    it('should render and match the snapshot', () => {
      renderer.render(<Accordion />);
      const renderedOutput = renderer.getRenderOutput();
      expect(renderedOutput).toMatchSnapshot();
    });
  });

  describe('#render', () => {
    it('should fire accordion click event and open it', () => {
      const onClickSpy = jest.fn();
      const { getByRole } = renderComponent({
        onClick: onClickSpy,
      });

      fireEvent.mouseDown(getByRole('button'));
      const buttonSpan = getByRole('button').querySelector('span');
      expect(buttonSpan).toBeDefined();
      buttonSpan.click();
    });
  });
});
