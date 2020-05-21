import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import ViewPage from '../pages/ViewPage'

describe('<ViewPage/>', () => {

  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ViewPage />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;
  beforeEach(() => wrapper = shallow(<ViewPage />));
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })
  it('should render a <div />', () => {
      expect(wrapper.find('div').length).toEqual(1);
  });
  it('should render 4 Routes to App Component', () =>{
    expect(wrapper.find('Route').length).toEqual(2);
})
})