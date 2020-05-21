import React from 'react';
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Habit from '../components/Habit'

describe(Habit, () => {
    // it('mounts to DOM', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.render(<Habit />, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // });

    // it('renders correctly', () => {
    //     const tree = renderer
    //         .create(<Habit />)
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    let wrapper;
    beforeEach(() => wrapper = shallow(<Habit />));
    it('Renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    // it('should render a <div />', () => {
    //     expect(wrapper.find('div').length).toEqual(1);
    // });

    // it('should render a <button />', () => {
    //     expect(wrapper.find('button').length).toEqual(1);
    // });

    // it('Hbit check with right data',()=>{
    //     wrapper = shallow(<Habit/>);
    //     wrapper.find('input[type="text"]').simulate('change', {target: {name: 'today', value: 'false'}});
    //     wrapper.find('button').simulate('click');
    //     expect(wrapper.state('today')).toBe(true);
    // })


})