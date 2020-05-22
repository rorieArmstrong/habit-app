import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import SignUp from '../components/SignUp'
import { MemoryRouter } from 'react-router-dom';


const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
  }

  
describe('<SignUp />', () => {
    it('mounts to DOM', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <MemoryRouter>    
            <SignUp />
        </MemoryRouter>
        , div);
        ReactDOM.unmountComponentAtNode(div);
    });
  
    let wrapper;

    beforeEach(() => wrapper = shallow(<SignUp.WrappedComponent />));
    it('Renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
  
    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render a <input />', () => {
        expect(wrapper.find('input').length).toEqual(4);
    });
  
    it('should render a <buton />', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });

    it('should render a <form />', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });
  
  })

describe('Test case for testing signUp',() =>{
    let wrapper;

    it('password check',()=>{
        wrapper = shallow(<SignUp/>);
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'susan123'}});
        expect(wrapper.state('password')).toEqual('susan123');
    });

    it('username check',()=>{
        wrapper = shallow(<SignUp/>);
        wrapper.find('[data-test="inp-username"]').simulate('change', {target: {name: 'user_name', value: 'susan'}});
        expect(wrapper.state('user_name')).toEqual('susan');
    });

    it('first name check',()=>{
        wrapper = shallow(<SignUp/>);
        wrapper.find('[data-test="inp-firstName"]').simulate('change', {target: {name: 'first_name', value: 'susan'}});
        expect(wrapper.state('first_name')).toEqual('susan');
    });

    it('surname check',()=>{
        wrapper = shallow(<SignUp/>);
        wrapper.find('[data-test="inp-surname"]').simulate('change', {target: {name: 'surname', value: 'missaglia'}});
        expect(wrapper.state('surname')).toEqual('missaglia');
    });

    it('signup check with right data',()=>{
        wrapper = shallow(<SignUp/>);
        wrapper.find('[data-test="inp-username"]').simulate('change', {target: {name: 'user_name', value: 'susan'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'susan123'}});
        wrapper.find('[data-test="inp-firstName"]').simulate('change', {target: {name: 'first_name', value: 'susan'}});
        wrapper.find('[data-test="inp-surname"]').simulate('change', {target: {name: 'surname', value: 'fochesatto'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('loading')).toBe(false);
    })

})

