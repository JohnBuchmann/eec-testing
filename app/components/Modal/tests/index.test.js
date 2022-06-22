/**
 * Testing our Modal component
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import Modal from '../index';

describe('<Modal />', () => {
  describe('#initialized', () => {
    it('should render <Modal> component', () => {
      const handleClose = jest.fn();
      const { getByText } = render(
        <Modal open onClose={handleClose}>
          <a onClick={handleClose} href="http://google.com">
            test
          </a>
        </Modal>
      );
      expect(getByText('test')).toBeTruthy();
    });

    describe('#click', () => {
      it('should close <Modal> component when clicking onClose ref', () => {
        const handleClose = jest.fn();
        const { getByText } = render(
          <Modal open onClose={handleClose}>
            <a onClick={handleClose} href="http://google.com">
              test
            </a>
          </Modal>
        );
        fireEvent.click(getByText('test'));
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });
  });
});
