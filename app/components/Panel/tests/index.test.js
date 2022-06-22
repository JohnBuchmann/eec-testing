import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Panel from '..';

const renderer = new ShallowRenderer();

describe('<Panel />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<Panel />);

    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
