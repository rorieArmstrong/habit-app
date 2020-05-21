import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import HabitList from '../components/HabitList'



/* **** Basic setup ***** */
let wrapper;
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }
const setup = (props={}, state='') => {
    const wrapper = shallow(<HabitList {...props} />)
    if (state) wrapper.setState(state);
    return wrapper;
}
/* *********************** */

describe(HabitList, () => {
    it('mounts to DOM', () => {
        const div = document.createElement('div');
        ReactDOM.render(<HabitList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    it('Renders correctly', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    })

    it('renders without Error', () => {
        const wrapper = setup();
        const habitListComponent = findByTestAttr(wrapper, 'component-HabitList')
        expect(habitListComponent.length).toBe(1);
     })

    it('should render a <div />', () => {
        const wrapper = setup();
        expect(wrapper.find('div').length).toEqual(2);
    });

    it('should render a <button />', () => {
        const wrapper = setup();
        expect(wrapper.find('button').length).toEqual(1);
    });


    it('Status starts as an empy state', () => {
        const wrapper = setup();
        const initialHabitState = wrapper.state('habits');
        expect(initialHabitState).toStrictEqual([])
    });

    describe('Should fetch a getData function', () => {
      it('Should fetch a getData function', () => {
        
        const fetchSpy = jest.spyOn(window, 'fetch');
        const HabitListInstance = shallow(
          <HabitList/>
        );
        expect(fetchSpy).toBeCalled();
      });
    });

  })

  