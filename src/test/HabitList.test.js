import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import HabitList from '../components/HabitList'

describe(HabitList, () => {
    it('mounts to DOM', () => {
        const div = document.createElement('div');
        ReactDOM.render(<HabitList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(<HabitList />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    let wrapper;
    beforeEach(() => wrapper = shallow(<HabitList />));
    it('Renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(2);
    });

    // it('calls componentDidMount', () => {
    //     jest.spyOn(HabitList.prototype, 'componentDidMount')
    //     expect(HabitList.prototype.componentDidMount.mock.calls.length).toBe(1)
    //   })


})