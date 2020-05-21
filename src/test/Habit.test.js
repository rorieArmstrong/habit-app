import React from 'react';
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Habit from '../components/Habit'
import axios from 'axios';


/* **** Basic setup ***** */
let wrapper;
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }
const setup = (props={}, state='') => {
    const wrapper = shallow(<Habit {...props} />)
    if (state) wrapper.setState(state);
    return wrapper;
}
/* *********************** */

jest.mock('axios');
 
describe('ToDoList component', () => {
  describe('when rendered', () => {
    it('should fetch a list of tasks', () => {
      const getSpy = jest.spyOn(axios, 'delete');
      const toDoListInstance = shallow(
        <Habit/>
      );
      expect(getSpy).toBeCalled();
    });
  });
});

describe(Habit, () => {
    it('mounts to DOM', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Habit />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render a <div />', () => {
                const wrapper = setup();
                expect(wrapper.find('div').length).toEqual(1);
            });
        


//     it('Renders correctly', () => {
//         const wrapper = setup();
//         expect(wrapper).toMatchSnapshot();
//     })

//     it('renders without Error', () => {
//         const wrapper = setup();
//         const homePageComponent = findByTestAttr(wrapper, 'component-HomePage')
//         expect(homePageComponent.length).toBe(1);
//      })

//     it('should render a <div />', () => {
//         const wrapper = setup();
//         expect(wrapper.find('div').length).toEqual(2);
//     });

//     it('should render a <button />', () => {
//         const wrapper = setup();
//         expect(wrapper.find('button').length).toEqual(2);
//     });

//     it('should render Login button',()=>{
//         const wrapper = setup();
//         const buttonLogin = findByTestAttr(wrapper, 'login-button')
//         expect(buttonLogin.length).toBe(1);
//     });

//     it('should render SignUp button',()=>{
//         const wrapper = setup();
//         const buttonSignUp = findByTestAttr(wrapper, 'signUp-button')
//         expect(buttonSignUp.length).toBe(1);
//     });

//     it('Status starts as an empy state', () => {
//         const wrapper = setup();
//         const initialLoginState = wrapper.state('status');
//         expect(initialLoginState).toBe("")
//     });

//     it('should render SignUp component after signUp button clicked',()=>{
//        const status = 'signup';
//        const wrapper = setup('', {status});
//        const buttonSignUp = findByTestAttr(wrapper, 'signUp-button');
//        buttonSignUp.simulate('click')
//        const initialLoginState = wrapper.state('status');
//        expect(initialLoginState).toBe("login")
//     });

//     it('should render Login component after login button clicked',()=>{
//         const status = 'login';
//         const wrapper = setup('', {status});
//         const buttonLogin = findByTestAttr(wrapper, 'login-button');
//         buttonLogin.simulate('click')
//         const initialLoginState = wrapper.state('status');
//         expect(initialLoginState).toBe("signup")
//      })

 })
