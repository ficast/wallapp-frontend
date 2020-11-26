import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../../src/components/atoms/Loading';

it('renders correctly', () => {
  const component = renderer
    .create(<Loading />)
    .toJSON();
  expect(component).toMatchSnapshot();
});