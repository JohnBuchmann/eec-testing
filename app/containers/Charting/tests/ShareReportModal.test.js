import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ShareReportModal from '../ShareReportModal';

describe('<OutRangeAlert />', () => {
  const closeShareReportModal = () => {};
  const generateSharedPdfHandler = () => {};
  const isOpen = true;
  const componentMount = mount(
    <IntlProvider locale="en">
      <ShareReportModal
        closeShareReportDialog={closeShareReportModal}
        generateSharedPdf={generateSharedPdfHandler}
        openModal={isOpen}
      />
    </IntlProvider>
  );
  it('should the component exist mounted', () => {
    const expected = true;
    const actual = componentMount.exists();
    expect(actual).toBe(expected);
  });
});
