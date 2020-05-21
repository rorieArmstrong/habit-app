import React from 'react';
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import HomePage from '../pages/HomePage'


const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

describe(HomePage, () => {
    it('mounts to DOM', () => {
        const div = document.createElement('div');
        ReactDOM.render(<HomePage />, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    let wrapper;
    beforeEach(() => wrapper = mount(<HomePage />));
    it('Renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(2);
    });

    it('should render a <button />', () => {
        expect(wrapper.find('button').length).toEqual(2);
    });

    it('check if form is render after login button is clicked',()=>{
        wrapper = shallow(<HomePage/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'susan'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'susan123'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('loading')).toBe(false);
    })


})

