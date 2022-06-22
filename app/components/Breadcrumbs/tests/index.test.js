/**
 * Testing our Breadcrumb component
 */

import React from 'react';
import { render } from 'react-testing-library';
import BreadcrumbsComponent from '../index';

const breadcrumbs = [
  {
    id: 1,
    name: 'Not selected breadcrumb',
  },
  {
    id: 2,
    name: 'Selected breadcrumb',
    selected: true,
  },
];

describe('<Breadcrumbs />', () => {
  describe('#initialized', () => {
    it('should render <Breadcrumbs /> with given mock breadcrumbs data', () => {
      const { getAllByTestId } = render(
        <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      );
      expect(getAllByTestId('1').length).toBe(1);
    });

    it('should render <Breadcrumbs /> with no data', () => {
      const { container } = render(<BreadcrumbsComponent breadcrumbs={[]} />);
      expect(container.querySelector('nav')).toBeDefined();
    });

    it('should render <Breadcrumbs /> with no props', () => {
      const { container } = render(<BreadcrumbsComponent />);
      expect(container.querySelector('nav')).toBeDefined();
    });
  });
});
