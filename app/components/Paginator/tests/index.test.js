/**
 *
 * Testing Paginator Component
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import Paginator from '../index';

const onClickSpy = jest.fn();
const renderComponent = (props = {}) =>
  render(<Paginator onPositionClick={onClickSpy} {...props} />);

describe('<Paginator />', () => {
  describe('#Constructor', () => {
    it('should render Paginator with defautl data', () => {
      const { container } = renderComponent();
      expect(container.innerHTML.includes('Next Device'));
    });
  });

  describe('#fire.click', () => {
    it('should click on previous and get Previous Device available', () => {
      const { container } = renderComponent({
        startPosition: 2,
        minPosition: 0,
        maxPosition: 4,
      });
      container.querySelector('button').click();
      expect(onClickSpy).toHaveBeenCalled();
    });

    it('should click on next and get Next Device available', () => {
      const { container } = renderComponent({
        startPosition: 2,
        minPosition: 0,
        maxPosition: 4,
      });
      container.querySelectorAll('button')[1].click();
      expect(onClickSpy).toHaveBeenCalled();
    });
  });
});
